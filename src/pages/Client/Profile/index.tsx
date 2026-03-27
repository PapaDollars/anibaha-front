import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faEdit,
  faCheck,
  faTimes,
  faCamera,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faShieldAlt,
  faCheckCircle,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@/store';
import { updateProfile } from '@/store/slices-test/authSlice';
import toast from 'react-hot-toast';
import { Address } from '@/types/user';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [addressForm, setAddressForm] = useState<Address>({
    id: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('validation.firstNameRequired', 'Le prénom est requis');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('validation.lastNameRequired', 'Le nom est requis');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired', "L'email est requis");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid', "L'email n'est pas valide");
    }

    if (formData.phone && !/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = t('validation.phoneInvalid', 'Le numéro de téléphone n\'est pas valide');
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = t('validation.currentPasswordRequired', 'Le mot de passe actuel est requis');
      }

      if (formData.newPassword.length < 6) {
        newErrors.newPassword = t('validation.passwordMinLength', 'Le nouveau mot de passe doit contenir au moins 6 caractères');
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = t('validation.passwordsNoMatch', 'Les mots de passe ne correspondent pas');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddressForm = () => {
    const newErrors: typeof errors = {};

    if (!addressForm.street.trim()) {
      newErrors.street = t('validation.streetRequired', 'La rue est requise');
    }

    if (!addressForm.city.trim()) {
      newErrors.city = t('validation.cityRequired', 'La ville est requise');
    }

    if (!addressForm.postalCode.trim()) {
      newErrors.postalCode = t('validation.postalCodeRequired', 'Le code postal est requis');
    }

    if (!addressForm.country.trim()) {
      newErrors.country = t('validation.countryRequired', 'Le pays est requis');
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
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        ...(formData.newPassword && { 
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword 
        })
      };

      await dispatch(updateProfile(updateData)).unwrap();
      
      toast.success(t('profile.updateSuccess', 'Profil mis à jour avec succès'));
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast.error(t('profile.updateError', 'Erreur lors de la mise à jour du profil'));
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAddressForm()) {
      return;
    }

    try {
      // TODO: Implémenter la mise à jour de l'adresse
      toast.success(t('profile.addressUpdateSuccess', 'Adresse mise à jour avec succès'));
      setIsEditingAddress(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'adresse:', error);
      toast.error(t('profile.addressUpdateError', 'Erreur lors de la mise à jour de l\'adresse'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleCancelAddress = () => {
    setAddressForm({
      id: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      isDefault: false
    });
    setErrors({});
    setIsEditingAddress(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* En-tête du profil */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={user.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute bottom-0 ml-40 bg-blue-600 text-white px-6 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faEdit} /> Modifier
                </button>
              </div>
            </div>
          </div>

          {/* Informations du profil */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600 mt-1">
                  {user.role === 'superAdmin' ? t('profile.admin', 'Administrateur') : t('profile.user', 'Utilisateur')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {user.isVerified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                    {t('profile.verified', 'Vérifié')}
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? t('profile.active', 'Actif') : t('profile.inactive', 'Inactif')}
                </span>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.firstName', 'Prénom')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.lastName', 'Nom')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('user.email', 'Email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('user.phone', 'Téléphone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t('profile.changePassword', 'Changer le mot de passe')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.currentPassword', 'Mot de passe actuel')}
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          id="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.newPassword', 'Nouveau mot de passe')}
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          id="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.newPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.confirmPassword', 'Confirmer le nouveau mot de passe')}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          id="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                  >
                    {t('common.cancel', 'Annuler')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    {t('common.save', 'Enregistrer')}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Informations de contact */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('profile.contactInfo', 'Informations de contact')}
                    </h2>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('profile.email', 'Email')}</p>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>

                    {user.phone && (
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.phone', 'Téléphone')}</p>
                          <p className="text-gray-900">{user.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Adresses */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {t('profile.addresses', 'Adresses')}
                      </h2>
                      <button
                        onClick={() => setIsEditingAddress(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        {t('profile.addAddress', 'Ajouter une adresse')}
                      </button>
                    </div>

                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {user.addresses.map((address) => (
                          <div key={address.id} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </div>
                                <div>
                                  <p className="text-gray-900">
                                    {address.street}<br />
                                    {address.postalCode} {address.city}<br />
                                    {address.country}
                                  </p>
                                  {address.isDefault && (
                                    <span className="inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      {t('profile.defaultAddress', 'Adresse par défaut')}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setAddressForm(address);
                                    setIsEditingAddress(true);
                                  }}
                                  className="p-2 text-gray-400 hover:text-blue-600"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => {
                                    // TODO: Implémenter la suppression d'adresse
                                    toast.error(t('profile.addressDeleteError', 'Fonctionnalité non implémentée'));
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-600"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <p className="text-gray-500">
                          {t('profile.noAddresses', 'Aucune adresse enregistrée')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations du compte */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {t('profile.accountInfo', 'Informations du compte')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('profile.memberSince', 'Membre depuis')}</p>
                        <p className="text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {user.lastLogin && (
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <FontAwesomeIcon icon={faShieldAlt} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.lastLogin', 'Dernière connexion')}</p>
                          <p className="text-gray-900">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Formulaire d'édition d'adresse */}
            {isEditingAddress && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {addressForm.id ? t('profile.editAddress', 'Modifier l\'adresse') : t('profile.addAddress', 'Ajouter une adresse')}
                  </h3>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('address.street', 'Rue')}
                      </label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        value={addressForm.street}
                        onChange={handleAddressInputChange}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.street ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.street && (
                        <p className="mt-1 text-sm text-red-600">{errors.street}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('address.postalCode', 'Code postal')}
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          value={addressForm.postalCode}
                          onChange={handleAddressInputChange}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.postalCode ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('address.city', 'Ville')}
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={addressForm.city}
                          onChange={handleAddressInputChange}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.city ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('address.country', 'Pays')}
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={addressForm.country}
                        onChange={handleAddressInputChange}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.country ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isDefault"
                        id="isDefault"
                        checked={addressForm.isDefault}
                        onChange={handleAddressInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                        {t('address.setAsDefault', 'Définir comme adresse par défaut')}
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={handleCancelAddress}
                        className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                      >
                        {t('common.cancel', 'Annuler')}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                      >
                        {t('common.save', 'Enregistrer')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;