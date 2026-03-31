import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { createProduct, updateProduct, fetchProductById } from '@/store/slices/productSlice';
import { categories } from '@/data/categories';
import { ROUTES } from '@/utils/url/url_frontend';

const AdminProductForm: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading } = useSelector((state: RootState) => state.product);

  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    images: [] as import('@/types/product').ProductImage[],
    category: '',
    stock: 0,
    isFeatured: false,
    rating: 0,
    views: 0,
    createdAt: '',
    updatedAt: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        images: selectedProduct.images as import('@/types/product').ProductImage[] || [],
        category: selectedProduct.category,
        stock: selectedProduct.stock,
        isFeatured: selectedProduct.isFeatured || false,
        rating: selectedProduct.rating || 0,
        views: selectedProduct.views || 0,
        createdAt: selectedProduct.createdAt || '',
        updatedAt: selectedProduct.updatedAt || '',
      });
    }
  }, [isEdit, selectedProduct]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t('validation.required', 'Ce champ est requis');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('validation.required', 'Ce champ est requis');
    }
    if (formData.price <= 0) {
      newErrors.price = t('validation.pricePositive', 'Le prix doit être positif');
    }
    if (!Array.isArray(formData.images) || formData.images.length === 0 || !formData.images[0].url) {
      newErrors.images = t('validation.required', 'Veuillez ajouter au moins une image valide');
    }
    if (!formData.category) {
      newErrors.category = t('validation.required', 'Ce champ est requis');
    }
    if (formData.stock < 0) {
      newErrors.stock = t('validation.stockPositive', 'Le stock doit être positif ou nul');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const productData = {
        ...formData,
        rating: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await dispatch(createProduct({
        ...productData,
        category: formData.category as import('@/utils/constants').ProductCategory,
        status: 'active',
        isActive: true,
        companyId: '',
        tags: [],
        slug: '',
        currency: 'EUR',
        images: Array.isArray(productData.images) ? productData.images as import('@/types/product').ProductImage[] : [],
        dimensions: { length: 0, width: 0, height: 0, unit: 'cm' },
        shippingInfo: { freeShipping: false, dimensions: { length: 0, width: 0, height: 0, unit: 'cm' } },
        comparePrice: undefined,
        isFeatured: false,
        trackQuantity: true,
        allowBackorder: false,
        hasVariants: false,
        isDigital: false,
        reviewCount: 0,
        totalRatings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        rating: 0,
        wishlistCount: 0,
        cartAddCount: 0,
        purchaseCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })).unwrap();
      toast.success(t('admin.products.success', 'Produit créé avec succès'));
      navigate('/admin/products');
    } catch (error) {
      toast.error(t('admin.products.error', 'Erreur lors de la création du produit'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => { if (selectedProduct?.id) navigate(ROUTES.GENERATORS.getCompanyProduct(selectedProduct.id)); }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? t('admin.products.editProduct', 'Modifier le produit') : t('admin.products.newProduct', 'Nouveau produit')}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? t('admin.products.editDescription', 'Modifiez les informations du produit') : t('admin.products.createDescription', 'Créez un nouveau produit')}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('admin.products.basicInfo', 'Informations de base')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.name', 'Nom du produit')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('admin.products.namePlaceholder', 'Entrez le nom du produit')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.category', 'Catégorie')} *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('admin.products.selectCategory', 'Sélectionnez une catégorie')}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.description', 'Description')} *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('admin.products.descriptionPlaceholder', 'Décrivez le produit en détail')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing and Inventory */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('admin.products.pricingInventory', 'Prix et inventaire')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.price', 'Prix')} (€) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.stock', 'Stock')} *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.stock ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('admin.products.image', 'Image')}
            </h2>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.products.imageUrl', 'URL de l\'image')} *
              </label>
              <div className="flex space-x-4">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={Array.isArray(formData.images) && formData.images[0] ? formData.images[0].url : ''}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.image ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
              
              {/* Image Preview */}
              {Array.isArray(formData.images) && formData.images[0] && formData.images[0].url && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {t('admin.products.imagePreview', 'Aperçu')}
                  </p>
                  <div className="w-48 h-48 border-2 border-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={Array.isArray(formData.images) && formData.images[0] ? formData.images[0].url : ''}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('admin.products.options', 'Options')}
            </h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="ml-3 text-sm font-medium text-gray-700">
                {t('admin.products.featured', 'Produit en vedette')}
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => { if (selectedProduct?.id) navigate(ROUTES.GENERATORS.getCompanyProduct(selectedProduct.id)); }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {t('common.cancel', 'Annuler')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FontAwesomeIcon icon={faSave} />
              <span>
                {loading 
                  ? t('common.saving', 'Enregistrement...') 
                  : isEdit 
                    ? t('common.update', 'Mettre à jour')
                    : t('common.create', 'Créer')
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;