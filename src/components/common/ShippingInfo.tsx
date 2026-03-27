import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

type ShippingAddressLike = {
  address?: string;
  street?: string;
  city: string;
  postalCode: string;
  country: string;
};

interface ShippingInfoProps {
  address: ShippingAddressLike;
  className?: string;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({ address, className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          {t('orders.shippingInfo', 'Informations de livraison')}
        </h3>
      </div>
      <div className="space-y-1">
        <p className="text-gray-600">{address.address || address.street || ''}</p>
        <p className="text-gray-600">
          {address.postalCode} {address.city}
        </p>
        <p className="text-gray-600">{address.country}</p>
      </div>
    </div>
  );
};

export default ShippingInfo; 