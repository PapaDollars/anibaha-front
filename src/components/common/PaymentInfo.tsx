import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { PaymentMethod } from '@/types/order';

interface PaymentInfoProps {
  method: PaymentMethod;
  total: number;
  className?: string;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ method, total, className = '' }) => {
  const { t } = useTranslation();

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'credit_card':
        return <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" />;
      case 'paypal':
        return <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        {getPaymentMethodIcon(method)}
        <h3 className="text-lg font-semibold text-gray-900">
          {t('orders.paymentInfo', 'Informations de paiement')}
        </h3>
      </div>
      <div className="space-y-1">
        <p className="text-gray-600">
          {t(`orders.paymentMethod.${method}`, method)}
        </p>
        <p className="text-gray-600">
          {t('orders.total', 'Total')}: {total.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          })}
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo; 