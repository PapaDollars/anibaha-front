import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, 
  faLock, 
  faCalendarAlt,
  faUser,
  faShieldAlt,
  faPhoneAlt,
  faComments,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
  customPaymentMethod?: string;
}

interface PaymentStepProps {
  paymentMethod: string;
  paymentData: PaymentData;
  onPaymentDataChange: (data: PaymentData) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  paymentMethod,
  paymentData,
  onPaymentDataChange,
  onNext,
  onBack,
  loading
}) => {
  const { t } = useTranslation();
  const [showCVV, setShowCVV] = useState(false);
  const [errors, setErrors] = useState<Partial<PaymentData>>({});

  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateExpiryDate = (expiryDate: string) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiryDate)) return false;
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
    }
    
    return true;
  };

  const validateForm = () => {
    const newErrors: Partial<PaymentData> = {};

    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber || !validateCardNumber(paymentData.cardNumber)) {
        newErrors.cardNumber = t('validation.invalidCardNumber', 'Numéro de carte invalide');
      }

      if (!paymentData.cardName.trim()) {
        newErrors.cardName = t('validation.cardNameRequired', 'Le nom sur la carte est requis');
      }

      if (!paymentData.expiryDate || !validateExpiryDate(paymentData.expiryDate)) {
        newErrors.expiryDate = t('validation.invalidExpiryDate', 'Date d\'expiration invalide');
      }

      if (!paymentData.cvv || !/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = t('validation.invalidCVV', 'CVV invalide');
      }
    } else if (paymentMethod === 'other') {
      if (!paymentData.customPaymentMethod?.trim()) {
        newErrors.customPaymentMethod = t('validation.paymentMethodRequired', 'Veuillez spécifier votre méthode de paiement');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentData, value: string | boolean) => {
    let processedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber' && typeof value === 'string') {
      processedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (processedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Format expiry date
    if (field === 'expiryDate' && typeof value === 'string') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        processedValue = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
      } else {
        processedValue = cleaned;
      }
      if (processedValue.length > 5) return;
    }

    // Limit CVV length
    if (field === 'cvv' && typeof value === 'string') {
      if (value.length > 4) return;
      processedValue = value.replace(/\D/g, '');
    }

    const newData = {
      ...paymentData,
      [field]: processedValue
    };

    onPaymentDataChange(newData);

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getCardType = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'Mastercard';
    if (cleaned.startsWith('3')) return 'Amex';
    return '';
  };

  return (
    <div className="space-y-8">
      {paymentMethod === 'card' ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('payment.cardDetails', 'Détails de la carte')}
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                {t('payment.cardNumber', 'Numéro de carte')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full pl-10 pr-20 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <FontAwesomeIcon 
                  icon={faCreditCard} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                {paymentData.cardNumber && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600">
                    {getCardType(paymentData.cardNumber)}
                  </span>
                )}
              </div>
              {errors.cardNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.cardNumber}</p>
              )}
            </div>

            {/* Card Name */}
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('payment.cardName', 'Nom sur la carte')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardName"
                  value={paymentData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  placeholder="Jean Dupont"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.cardName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
              {errors.cardName && (
                <p className="mt-2 text-sm text-red-600">{errors.cardName}</p>
              )}
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('payment.expiryDate', 'Date d\'expiration')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/AA"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <FontAwesomeIcon 
                    icon={faCalendarAlt} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                </div>
                {errors.expiryDate && (
                  <p className="mt-2 text-sm text-red-600">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('payment.cvv', 'CVV')}
                </label>
                <div className="relative">
                  <input
                    type={showCVV ? 'text' : 'password'}
                    id="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <FontAwesomeIcon 
                    icon={faLock} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowCVV(!showCVV)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showCVV ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.cvv && (
                  <p className="mt-2 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Save Card */}
            <div className="flex items-center">
              <input
                id="saveCard"
                type="checkbox"
                checked={paymentData.saveCard}
                onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="saveCard" className="ml-3 text-sm text-gray-700">
                {t('payment.saveCard', 'Enregistrer cette carte pour les prochains achats')}
              </label>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">
                    {t('payment.securityTitle', 'Paiement sécurisé')}
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {t('payment.securityDescription', 'Vos informations sont cryptées et sécurisées avec le protocole SSL.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faShieldAlt} className="text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('payment.otherMethod', 'Autre méthode de paiement')}
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="customPaymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                {t('payment.customMethod', 'Précisez votre méthode de paiement')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="customPaymentMethod"
                  value={paymentData.customPaymentMethod || ''}
                  onChange={(e) => handleInputChange('customPaymentMethod', e.target.value)}
                  placeholder={t('payment.customMethodPlaceholder', 'Ex: Chèque, Orange Money, Wave, MTN Mobile Money, etc.')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.customPaymentMethod ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <FontAwesomeIcon 
                  icon={faShieldAlt} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
              {errors.customPaymentMethod && (
                <p className="mt-2 text-sm text-red-600">{errors.customPaymentMethod}</p>
              )}
            </div>

            <div className="p-6 text-center">
    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <FontAwesomeIcon icon={faComments} className="text-blue-600 text-3xl" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {t('payment.otherMethodHeader', 'Vous serez contacté par la boutique')}
    </h3>
    <p className="text-gray-600 mb-6">
      {t('payment.otherMethodDescription', 'Après confirmation de votre commande, notre équipe vous contactera pour finaliser le paiement et organiser la livraison.')}
    </p>
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <p className="text-sm text-blue-800">
        {t('payment.otherMethodNote', 'Préparez vos coordonnées et votre méthode de paiement préférée que vous avez spécifiée dans le champ ci-dessus')}
      </p>
    </div>
  </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {t('common.back', 'Retour')}
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{t('common.processing', 'Traitement...')}</span>
            </span>
          ) : (
            <span>{t('common.continue', 'Continuer')}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;