import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faBox, 
  faTruck, 
  faCheckCircle, 
  faTimesCircle 
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { OrderStatus } from '@/types/order';

interface OrderStatusProps {
  status: OrderStatus;
  showLabel?: boolean;
  className?: string;
}

const OrderStatusComponent: React.FC<OrderStatusProps> = ({ 
  status, 
  showLabel = true,
  className = ''
}) => {
  const { t } = useTranslation();

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: faClock,
          iconClass: 'text-yellow-500',
          bgClass: 'bg-yellow-100',
          textClass: 'text-yellow-800'
        };
      case 'processing':
        return {
          icon: faBox,
          iconClass: 'text-blue-500',
          bgClass: 'bg-blue-100',
          textClass: 'text-blue-800'
        };
      case 'shipped':
        return {
          icon: faTruck,
          iconClass: 'text-purple-500',
          bgClass: 'bg-purple-100',
          textClass: 'text-purple-800'
        };
      case 'delivered':
        return {
          icon: faCheckCircle,
          iconClass: 'text-green-500',
          bgClass: 'bg-green-100',
          textClass: 'text-green-800'
        };
      case 'cancelled':
        return {
          icon: faTimesCircle,
          iconClass: 'text-red-500',
          bgClass: 'bg-red-100',
          textClass: 'text-red-800'
        };
      default:
        return {
          icon: faClock,
          iconClass: 'text-gray-500',
          bgClass: 'bg-gray-100',
          textClass: 'text-gray-800'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <FontAwesomeIcon icon={config.icon} className={config.iconClass} />
      {showLabel && (
        <span className={`font-medium ${config.textClass}`}>
          {t(`orders.status.${status}`)}
        </span>
      )}
    </div>
  );
};

export default OrderStatusComponent; 