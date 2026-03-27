import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faSave,
  faUndo,
  faEnvelope,
  faCreditCard,
  faTruck,
  faGlobe,
  faShieldAlt,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { AppDispatch, RootState } from '@/store';
import { updateSettings } from '@/store/slices-test/settingsSlice';
import type { Settings as SettingsType } from '@/types/settings';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data: settings, loading } = useSelector((state: RootState) => state.settings);
  const [activeTab, setActiveTab] = useState('general');

  const [formData, setFormData] = useState<SettingsType>({
    id: settings?.id || '',
    siteName: settings?.siteName || '',
    siteDescription: settings?.siteDescription || '',
    contactEmail: settings?.contactEmail || '',
    phoneNumber: settings?.phoneNumber || '',
    address: settings?.address || '',
    currency: settings?.currency || 'EUR',
    language: settings?.language || 'fr',
    timezone: settings?.timezone || 'Europe/Paris',
    socialMedia: {
      facebook: settings?.socialMedia?.facebook || '',
      twitter: settings?.socialMedia?.twitter || '',
      instagram: settings?.socialMedia?.instagram || ''
    },
    email: {
      smtpHost: settings?.email?.smtpHost || '',
      smtpPort: settings?.email?.smtpPort || 587,
      smtpUser: settings?.email?.smtpUser || '',
      smtpPassword: settings?.email?.smtpPassword || '',
      fromEmail: settings?.email?.fromEmail || '',
      fromName: settings?.email?.fromName || ''
    },
    payment: {
      stripePublicKey: settings?.payment?.stripePublicKey || '',
      stripeSecretKey: settings?.payment?.stripeSecretKey || '',
      paypalClientId: settings?.payment?.paypalClientId || '',
      paypalSecret: settings?.payment?.paypalSecret || ''
    },
    shipping: {
      shippingMethods: settings?.shipping?.shippingMethods || [],
      freeShippingThreshold: settings?.shipping?.freeShippingThreshold || 0
    },
    updatedAt: settings?.updatedAt || new Date().toISOString()
  });

  const handleInputChange = (section: string, field: string, value: string | number | any[]) => {
    if (typeof formData[section as keyof SettingsType] === 'object' && formData[section as keyof SettingsType] !== null) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...((prev[section as keyof SettingsType] as object) || {}),
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateSettings(formData as Partial<SettingsType>)).unwrap();
      toast.success(t('admin.settings.success', 'Paramètres enregistrés avec succès'));
    } catch (error) {
      toast.error(t('admin.settings.error', 'Erreur lors de l\'enregistrement des paramètres'));
    }
  };

  const handleReset = () => {
    setFormData({
      id: settings?.id || '',
      siteName: settings?.siteName || '',
      siteDescription: settings?.siteDescription || '',
      contactEmail: settings?.contactEmail || '',
      phoneNumber: settings?.phoneNumber || '',
      address: settings?.address || '',
      currency: settings?.currency || 'EUR',
      language: settings?.language || 'fr',
      timezone: settings?.timezone || 'Europe/Paris',
      socialMedia: {
        facebook: settings?.socialMedia?.facebook || '',
        twitter: settings?.socialMedia?.twitter || '',
        instagram: settings?.socialMedia?.instagram || ''
      },
      email: {
        smtpHost: settings?.email?.smtpHost || '',
        smtpPort: settings?.email?.smtpPort || 587,
        smtpUser: settings?.email?.smtpUser || '',
        smtpPassword: settings?.email?.smtpPassword || '',
        fromEmail: settings?.email?.fromEmail || '',
        fromName: settings?.email?.fromName || ''
      },
      payment: {
        stripePublicKey: settings?.payment?.stripePublicKey || '',
        stripeSecretKey: settings?.payment?.stripeSecretKey || '',
        paypalClientId: settings?.payment?.paypalClientId || '',
        paypalSecret: settings?.payment?.paypalSecret || ''
      },
      shipping: {
        shippingMethods: settings?.shipping?.shippingMethods || [],
        freeShippingThreshold: settings?.shipping?.freeShippingThreshold || 0
      },
      updatedAt: settings?.updatedAt || new Date().toISOString()
    });
  };

  const handleAddShippingMethod = () => {
    const newMethods = [...formData.shipping.shippingMethods, { name: '', price: 0, description: '' }];
    setFormData(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        shippingMethods: newMethods
      }
    }));
  };

  const handleUpdateShippingMethod = (index: number, field: 'name' | 'price' | 'description', value: string | number) => {
    const newMethods = [...formData.shipping.shippingMethods];
    newMethods[index] = {
      ...newMethods[index],
      [field]: field === 'price' ? parseFloat(value as string) : value
    };
    setFormData(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        shippingMethods: newMethods
      }
    }));
  };

  const handleRemoveShippingMethod = (index: number) => {
    const newMethods = formData.shipping.shippingMethods.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        shippingMethods: newMethods
      }
    }));
  };

  const tabs = [
    { id: 'general', icon: faGlobe, label: t('admin.settings.general.title', 'Général') },
    { id: 'email', icon: faEnvelope, label: t('admin.settings.email.title', 'Email') },
    { id: 'payment', icon: faCreditCard, label: t('admin.settings.payment.title', 'Paiement') },
    { id: 'shipping', icon: faTruck, label: t('admin.settings.shipping.title', 'Livraison') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FontAwesomeIcon icon={faCog} className="text-blue-600 mr-3" />
            {t('admin.settings.title', 'Paramètres')}
          </h1>
          <p className="text-gray-600">
            {t('admin.settings.description', 'Configurez les paramètres de votre boutique')}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('admin.settings.general.siteName', 'Nom du site')}
                    </label>
                    <input
                      type="text"
                      value={formData.siteName}
                      onChange={(e) => handleInputChange('siteName', 'siteName', e.target.value)}
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('admin.settings.general.siteDescription', 'Description du site')}
                    </label>
                    <textarea
                      value={formData.siteDescription}
                      onChange={(e) => handleInputChange('siteDescription', 'siteDescription', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.general.currency', 'Devise')}
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', 'currency', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.general.language', 'Langue')}
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => handleInputChange('language', 'language', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.general.timezone', 'Fuseau horaire')}
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => handleInputChange('timezone', 'timezone', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Europe/Paris">Europe/Paris</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="America/New_York">America/New_York</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          {t('admin.settings.payment.securityNote', 'Sécurité des paiements')}
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            {t('admin.settings.payment.securityDescription', 'Vos clés API sont stockées de manière sécurisée et ne sont jamais exposées aux utilisateurs.')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.payment.stripeKey', 'Clé Stripe')}
                      </label>
                      <input
                        type="password"
                        value={formData.payment.stripePublicKey}
                        onChange={(e) => handleInputChange('payment', 'stripePublicKey', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.payment.stripeSecret', 'Secret Stripe')}
                      </label>
                      <input
                        type="password"
                        value={formData.payment.stripeSecretKey}
                        onChange={(e) => handleInputChange('payment', 'stripeSecretKey', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.payment.paypalClientId', 'ID client PayPal')}
                      </label>
                      <input
                        type="password"
                        value={formData.payment.paypalClientId}
                        onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.payment.paypalSecret', 'Secret PayPal')}
                      </label>
                      <input
                        type="password"
                        value={formData.payment.paypalSecret}
                        onChange={(e) => handleInputChange('payment', 'paypalSecret', e.target.value)}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.settings.shipping.freeShippingThreshold', 'Seuil de livraison gratuite')}
                      </label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <input
                          type="number"
                          value={formData.shipping.freeShippingThreshold}
                          onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
                          className="block w-full rounded-xl border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500"
                          step="0.01"
                          min="0"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('admin.settings.shipping.shippingMethods', 'Méthodes de livraison')}
                    </label>
                    <div className="mt-2 space-y-2">
                      {formData.shipping.shippingMethods.map((method, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={method.name}
                            onChange={(e) => handleUpdateShippingMethod(index, 'name', e.target.value)}
                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            value={method.price}
                            onChange={(e) => handleUpdateShippingMethod(index, 'price', e.target.value)}
                            className="block w-32 rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={method.description}
                            onChange={(e) => handleUpdateShippingMethod(index, 'description', e.target.value)}
                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveShippingMethod(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddShippingMethod}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        {t('admin.settings.shipping.addMethod', 'Ajouter une méthode')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FontAwesomeIcon icon={faUndo} className="mr-2" />
                  {t('admin.settings.reset', 'Réinitialiser')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  {t('admin.settings.save', 'Enregistrer les modifications')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;