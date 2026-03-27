// ================================================================
// AdminProductForm.tsx - Migré : fakeData → Redux + API + Firebase Storage
// Changements :
//   AVANT : import { categories } from '@/data/categories'  (select catégorie)
//           Image saisie comme URL texte
//   APRÈS : useSelector(state => state.category.categories)
//           Image uploadée vers Firebase Storage via dispatch(uploadProductImages)
// ================================================================
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { createProduct, updateProduct, fetchProductById, uploadProductImages } from '@/store/slices/productSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { ROUTES } from '@/utils/url/url_frontend';
import type { ProductImage } from '@/types/product';

const AdminProductForm: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { selectedProduct, loading } = useSelector((state: RootState) => state.product);
  // ✅ Catégories viennent du store Redux (plus de fakeData)
  const { categories } = useSelector((state: RootState) => state.category);

  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    comparePrice: 0,
    images: [] as ProductImage[],
    category: '',
    stock: 0,
    isFeatured: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingImages, setUploadingImages] = useState(false);

  // Charger les catégories si vides
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Charger le produit en mode édition
  useEffect(() => {
    if (isEdit && id) dispatch(fetchProductById(id));
  }, [dispatch, id, isEdit]);

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (isEdit && selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        comparePrice: selectedProduct.comparePrice ?? 0,
        images: (selectedProduct.images as ProductImage[]) || [],
        category: selectedProduct.category,
        stock: selectedProduct.stock,
        isFeatured: selectedProduct.isFeatured || false,
      });
    }
  }, [isEdit, selectedProduct]);

  // ── Validation ────────────────────────────────────────────────

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.required', 'Champ requis');
    if (!formData.description.trim()) newErrors.description = t('validation.required', 'Champ requis');
    if (formData.price <= 0) newErrors.price = t('validation.pricePositive', 'Le prix doit être > 0');
    if (formData.images.length === 0) newErrors.images = t('validation.required', 'Ajoutez au moins une image');
    if (!formData.category) newErrors.category = t('validation.required', 'Champ requis');
    if (formData.stock < 0) newErrors.stock = t('validation.stockPositive', 'Stock doit être ≥ 0');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Upload images vers Firebase Storage ───────────────────────

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      // ✅ Upload vers Firebase Storage via l'API
      const result = await dispatch(uploadProductImages(files)).unwrap();
      const newImages: ProductImage[] = result.map((r: { url: string }, i: number) => ({
        id: `img_${Date.now()}_${i}`,
        url: r.url,
        isPrimary: formData.images.length === 0 && i === 0,
        order: formData.images.length + i + 1,
      }));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
      toast.success(`${newImages.length} image(s) uploadée(s) avec succès`);
    } catch {
      toast.error('Erreur lors de l\'upload des images');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId).map((img, i) => ({ ...img, order: i + 1, isPrimary: i === 0 })),
    }));
  };

  // ── Soumission ────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEdit && id) {
        await dispatch(updateProduct({ id, data: formData })).unwrap();
        toast.success(t('admin.products.updateSuccess', 'Produit mis à jour'));
      } else {
        await dispatch(createProduct({
          ...formData,
          status: 'draft',
          isActive: false,
          companyId: '',
          tags: [],
          slug: '',
          currency: 'XAF',
          trackQuantity: true,
          allowBackorder: false,
          hasVariants: false,
          isDigital: false,
          reviewCount: 0,
          rating: 0,
          totalRatings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          wishlistCount: 0,
          cartAddCount: 0,
          purchaseCount: 0,
        })).unwrap();
        toast.success(t('admin.products.success', 'Produit créé avec succès'));
      }
      navigate(ROUTES.COMPANY.PRODUCTS.LIST);
    } catch (error: unknown) {
      const msg = typeof error === 'string' ? error : 'Erreur lors de l\'enregistrement';
      toast.error(msg);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(ROUTES.COMPANY.PRODUCTS.LIST)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? t('admin.products.editProduct', 'Modifier le produit') : t('admin.products.newProduct', 'Nouveau produit')}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? t('admin.products.editDescription', 'Modifiez les informations') : t('admin.products.createDescription', 'Créez un nouveau produit')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Informations de base */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('admin.products.basicInfo', 'Informations de base')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.name', 'Nom du produit')} *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder={t('admin.products.namePlaceholder', 'Nom du produit')} />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* ✅ Select catégorie branché sur Redux */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.category', 'Catégorie')} *</label>
                <select name="category" value={formData.category} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-300' : 'border-gray-300'}`}>
                  <option value="">{t('admin.products.selectCategory', 'Sélectionnez une catégorie')}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>{category.name}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.description', 'Description')} *</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder={t('admin.products.descriptionPlaceholder', 'Décrivez le produit en détail')} />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Prix et stock */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('admin.products.pricingInventory', 'Prix et inventaire')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.price', 'Prix')} (FCFA) *</label>
                <input type="number" name="price" step="1" min="0" value={formData.price} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.price ? 'border-red-300' : 'border-gray-300'}`} />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.comparePrice', 'Prix barré')} (FCFA)</label>
                <input type="number" name="comparePrice" step="1" min="0" value={formData.comparePrice} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.stock', 'Stock')} *</label>
                <input type="number" name="stock" min="0" value={formData.stock} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.stock ? 'border-red-300' : 'border-gray-300'}`} />
                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
              </div>
            </div>
          </div>

          {/* ✅ Images - Upload vers Firebase Storage (plus URL texte) */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('admin.products.image', 'Images')}</h2>
            {errors.images && <p className="mb-3 text-sm text-red-600">{errors.images}</p>}

            {/* Bouton d'upload */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <FontAwesomeIcon icon={faUpload} className="text-gray-400 text-3xl mb-3" />
              <p className="text-gray-600 font-medium">
                {uploadingImages ? 'Upload en cours...' : 'Cliquez pour uploader des images'}
              </p>
              <p className="text-gray-400 text-sm mt-1">JPG, PNG, WebP — max 5MB par image (5 max)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploadingImages}
              />
            </div>

            {/* Prévisualisation des images uploadées */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                {formData.images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img src={img.url} alt="" className="w-full h-24 object-cover rounded-lg border-2 border-gray-200" />
                    {img.isPrimary && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">Principal</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Options */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('admin.products.options', 'Options')}</h2>
            <div className="flex items-center">
              <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="isFeatured" className="ml-3 text-sm font-medium text-gray-700">
                {t('admin.products.featured', 'Produit en vedette')}
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="button" onClick={() => navigate(ROUTES.COMPANY.PRODUCTS.LIST)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              {t('common.cancel', 'Annuler')}
            </button>
            <button type="submit" disabled={loading || uploadingImages}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <FontAwesomeIcon icon={faSave} />
              <span>
                {loading ? t('common.saving', 'Enregistrement...')
                  : isEdit ? t('common.update', 'Mettre à jour')
                  : t('common.create', 'Créer')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;