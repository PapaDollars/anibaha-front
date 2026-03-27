import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          Commande confirmée !
        </h2>
        <p className="mt-2 text-lg text-gray-500">
          Merci pour votre commande. Nous vous enverrons un email de confirmation
          avec les détails de votre commande.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/orders"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700"
          >
            Voir mes commandes
          </Link>
          <Link
            to="/products"
            className="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess; 