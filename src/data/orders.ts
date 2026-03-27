import { products } from '@/data/products';
import { users } from '@/data/users';
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from '@/types/order';
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from '@/utils/constants';


export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    userId: users[0].id,
    user: users[0],
    companyId: '1',
    company: undefined,
    items: [
      {
        id: '1',
        productId: products[0].id,
        product: products[0],
        quantity: 2,
        unitPrice: products[0].price,
        totalPrice: products[0].price * 2,
        productSnapshot: {
          name: products[0].name,
          image: products[0].images[0].url,
          sku: products[0].id
        }
      }
    ],
    status: ORDER_STATUS.PENDING,
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      phone: '1234567890'
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      phone: '1234567890'
    },
    payment: {
      method: PAYMENT_METHODS.CREDIT_CARD,
      status: PAYMENT_STATUS.COMPLETED,
      amount: products[0].price * 2,
      currency: 'XAF',
      transactionId: 'TXN-001',
      events: [
        {
          status: PAYMENT_STATUS.COMPLETED,
          amount: products[0].price * 2,
          description: 'Paiement reçu',
          timestamp: new Date().toISOString()
        }
      ]
    },
    shipping: {
      method: 'standard',
      cost: 10,
      estimatedDays: 3,
      trackingNumber: 'TRACK-001',
      carrier: 'DHL',
      trackingUrl: 'https://dhl.com/track/TRACK-001',
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        phone: '1234567890'
      },
      events: [
        {
          status: 'shipped',
          description: 'Colis expédié',
          location: 'Paris',
          timestamp: new Date().toISOString()
        }
      ]
    },
    totals: {
      subtotal: products[0].price * 2,
      tax: 0,
      taxRate: 0,
      shipping: 10,
      discount: 0,
      total: products[0].price * 2 + 10,
      currency: 'XAF'
    },
    notes: 'Livraison rapide demandée',
    customerNotes: 'Merci !',
    adminNotes: '',
    statusHistory: [
      {
        status: ORDER_STATUS.PENDING,
        timestamp: new Date().toISOString(),
        note: 'Commande créée'
      }
    ],
    canReview: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    userId: users[1].id,
    user: users[1],
    companyId: '1',
    company: undefined,
    items: [
      {
        id: '3',
        productId: products[1].id,
        product: products[1],
        quantity: 1,
        unitPrice: products[1].price,
        totalPrice: products[1].price,
        productSnapshot: {
          name: products[1].name,
          image: products[1].images[0].url,
          sku: products[1].id
        }
      }
    ],
    status: ORDER_STATUS.PROCESSING,
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '456 Avenue des Champs-Élysées',
      city: 'Paris',
      postalCode: '75008',
      country: 'France',
      phone: '1234567890'
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '456 Avenue des Champs-Élysées',
      city: 'Paris',
      postalCode: '75008',
      country: 'France',
      phone: '1234567890'
    },
    payment: {
      method: PAYMENT_METHODS.PAYPAL,
      status: PAYMENT_STATUS.FAILED,
      amount: products[1].price,
      currency: 'XAF',
      transactionId: 'TXN-002',
      events: [
        {
          status: PAYMENT_STATUS.FAILED,
          amount: products[1].price,
          description: 'Paiement refusé',
          timestamp: '2024-01-02T00:00:00.000Z'
        }
      ]
    },
    shipping: {
      method: 'standard',
      cost: 10,
      estimatedDays: 4,
      trackingNumber: 'TRACK-002',
      carrier: 'UPS',
      trackingUrl: 'https://ups.com/track/TRACK-002',
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '456 Avenue des Champs-Élysées',
        city: 'Paris',
        postalCode: '75008',
        country: 'France',
        phone: '1234567890'
      },
      events: [
        {
          status: 'shipped',
          description: 'Colis expédié',
          location: 'Paris',
          timestamp: '2024-01-02T00:00:00.000Z'
        }
      ]
    },
    totals: {
      subtotal: products[1].price,
      tax: 0,
      taxRate: 0,
      shipping: 10,
      discount: 0,
      total: products[1].price + 10,
      currency: 'XAF'
    },
    notes: 'Livraison standard',
    customerNotes: '',
    adminNotes: '',
    statusHistory: [
      {
        status: ORDER_STATUS.PROCESSING,
        timestamp: '2024-01-02T00:00:00.000Z',
        note: 'Traitement en cours'
      }
    ],
    canReview: false,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    userId: users[2].id,
    user: users[2],
    companyId: '1',
    company: undefined,
    items: [
      {
        id: '4',
        productId: products[3].id,
        product: products[3],
        quantity: 1,
        unitPrice: products[3].price,
        totalPrice: products[3].price,
        productSnapshot: {
          name: products[3].name,
          image: products[3].images[0].url,
          sku: products[3].id
        }
      },
      {
        id: '5',
        productId: products[4].id,
        product: products[4],
        quantity: 1,
        unitPrice: products[4].price,
        totalPrice: products[4].price,
        productSnapshot: {
          name: products[4].name,
          image: products[4].images[0].url,
          sku: products[4].id
        }
      }
    ],
    status: ORDER_STATUS.PENDING,
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '789 Boulevard Saint-Germain',
      city: 'Paris',
      postalCode: '75006',
      country: 'France',
      phone: '1234567890'
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '789 Boulevard Saint-Germain',
      city: 'Paris',
      postalCode: '75006',
      country: 'France',
      phone: '1234567890'
    },
    payment: {
      method: PAYMENT_METHODS.CREDIT_CARD,
      status: PAYMENT_STATUS.PENDING,
      amount: products[3].price + products[4].price,
      currency: 'XAF',
      transactionId: 'TXN-003',
      events: [
        {
          status: PAYMENT_STATUS.PENDING,
          amount: products[3].price + products[4].price,
          description: 'Paiement en attente',
          timestamp: '2024-01-03T00:00:00.000Z'
        }
      ]
    },
    shipping: {
      method: 'express',
      cost: 15,
      estimatedDays: 2,
      trackingNumber: 'TRACK-003',
      carrier: 'FedEx',
      trackingUrl: 'https://fedex.com/track/TRACK-003',
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '789 Boulevard Saint-Germain',
        city: 'Paris',
        postalCode: '75006',
        country: 'France',
        phone: '1234567890'
      },
      events: [
        {
          status: 'shipped',
          description: 'Colis expédié',
          location: 'Paris',
          timestamp: '2024-01-03T00:00:00.000Z'
        }
      ]
    },
    totals: {
      subtotal: products[3].price + products[4].price,
      tax: 0,
      taxRate: 0,
      shipping: 15,
      discount: 0,
      total: products[3].price + products[4].price + 15,
      currency: 'XAF'
    },
    notes: '',
    customerNotes: '',
    adminNotes: '',
    statusHistory: [
      {
        status: ORDER_STATUS.PENDING,
        timestamp: '2024-01-03T00:00:00.000Z',
        note: 'Commande en attente'
      }
    ],
    canReview: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    userId: users[3].id,
    user: users[3],
    companyId: '1',
    company: undefined,
    items: [
      {
        id: '6',
        productId: products[5].id,
        product: products[5],
        quantity: 2,
        unitPrice: products[5].price,
        totalPrice: products[5].price * 2,
        productSnapshot: {
          name: products[5].name,
          image: products[5].images[0].url,
          sku: products[5].id
        }
      },
      {
        id: '7',
        productId: products[6].id,
        product: products[6],
        quantity: 1,
        unitPrice: products[6].price,
        totalPrice: products[6].price,
        productSnapshot: {
          name: products[6].name,
          image: products[6].images[0].url,
          sku: products[6].id
        }
      }
    ],
    status: ORDER_STATUS.DELIVERED,
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '321 Rue de la Paix',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      phone: '1234567890'
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '321 Rue de la Paix',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      phone: '1234567890'
    },
    payment: {
      method: PAYMENT_METHODS.CREDIT_CARD,
      status: PAYMENT_STATUS.COMPLETED,
      amount: products[5].price * 2 + products[6].price,
      currency: 'XAF',
      transactionId: 'TXN-004',
      events: [
        {
          status: PAYMENT_STATUS.PENDING,
          amount: products[5].price * 2 + products[6].price,
          description: 'Paiement en attente',
          timestamp: '2024-01-04T00:00:00.000Z'
        },
        {
          status: PAYMENT_STATUS.COMPLETED,
          amount: products[5].price * 2 + products[6].price,
          description: 'Paiement confirmé',
          timestamp: '2024-01-04T01:30:00.000Z'
        }
      ]
    },
    shipping: {
      method: 'standard',
      cost: 10,
      estimatedDays: 5,
      trackingNumber: 'TRACK-004',
      carrier: 'DHL',
      trackingUrl: 'https://dhl.com/track/TRACK-004',
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '321 Rue de la Paix',
        city: 'Lyon',
        postalCode: '69001',
        country: 'France',
        phone: '1234567890'
      },
      events: [
        {
          status: 'shipped',
          description: 'Colis expédié',
          location: 'Lyon',
          timestamp: '2024-01-04T08:00:00.000Z'
        },
        {
          status: 'in_transit',
          description: 'En transit',
          location: 'Centre de tri Lyon',
          timestamp: '2024-01-05T14:30:00.000Z'
        },
        {
          status: 'delivered',
          description: 'Livré',
          location: 'Lyon',
          timestamp: '2024-01-08T16:45:00.000Z'
        }
      ]
    },
    totals: {
      subtotal: products[5].price * 2 + products[6].price,
      tax: (products[5].price * 2 + products[6].price) * 0.2,
      taxRate: 0.2,
      shipping: 10,
      discount: 0,
      total: (products[5].price * 2 + products[6].price) + ((products[5].price * 2 + products[6].price) * 0.2) + 10,
      currency: 'XAF'
    },
    notes: 'Commande livrée avec succès',
    customerNotes: 'Livraison rapide, merci !',
    adminNotes: 'Client satisfait, aucun problème',
    statusHistory: [
      {
        status: ORDER_STATUS.PENDING,
        timestamp: '2024-01-04T00:00:00.000Z',
        note: 'Commande créée'
      },
      {
        status: ORDER_STATUS.CONFIRMED,
        timestamp: '2024-01-04T01:30:00.000Z',
        note: 'Paiement confirmé'
      },
      {
        status: ORDER_STATUS.PROCESSING,
        timestamp: '2024-01-04T06:00:00.000Z',
        note: 'Commande en préparation'
      },
      {
        status: ORDER_STATUS.SHIPPED,
        timestamp: '2024-01-04T08:00:00.000Z',
        note: 'Commande expédiée'
      },
      {
        status: ORDER_STATUS.DELIVERED,
        timestamp: '2024-01-08T16:45:00.000Z',
        note: 'Commande livrée'
      }
    ],
    canReview: true,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-08T16:45:00.000Z'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    userId: users[4].id,
    user: users[4],
    companyId: '1',
    company: undefined,
    items: [
      {
        id: '8',
        productId: products[7].id,
        product: products[7],
        quantity: 1,
        unitPrice: products[7].price,
        totalPrice: products[7].price,
        productSnapshot: {
          name: products[7].name,
          image: products[7].images[0].url,
          sku: products[7].id
        }
      }
    ],
    status: ORDER_STATUS.PROCESSING,
    billingAddress: {
      firstName: 'Marie',
      lastName: 'Dubois',
      street: '654 Avenue Victor Hugo',
      city: 'Marseille',
      postalCode: '13001',
      country: 'France',
      phone: '0987654321'
    },
    shippingAddress: {
      firstName: 'Marie',
      lastName: 'Dubois',
      street: '654 Avenue Victor Hugo',
      city: 'Marseille',
      postalCode: '13001',
      country: 'France',
      phone: '0987654321'
    },
    payment: {
      method: PAYMENT_METHODS.PAYPAL,
      status: PAYMENT_STATUS.PENDING,
      amount: products[7].price,
      currency: 'XAF',
      transactionId: 'TXN-005',
      events: [
        {
          status: PAYMENT_STATUS.PENDING,
          amount: products[7].price,
          description: 'Paiement PayPal en attente',
          timestamp: '2024-01-05T00:00:00.000Z'
        }
      ]
    },
    shipping: {
      method: 'standard',
      cost: 8,
      estimatedDays: 4,
      trackingNumber: 'TRACK-005',
      carrier: 'La Poste',
      trackingUrl: 'https://laposte.fr/track/TRACK-005',
      address: {
        firstName: 'Marie',
        lastName: 'Dubois',
        street: '654 Avenue Victor Hugo',
        city: 'Marseille',
        postalCode: '13001',
        country: 'France',
        phone: '0987654321'
      },
      events: [
        {
          status: 'processing',
          description: 'Commande en préparation',
          location: 'Entrepôt Paris',
          timestamp: '2024-01-05T10:00:00.000Z'
        }
      ]
    },
    totals: {
      subtotal: products[7].price,
      tax: products[7].price * 0.2,
      taxRate: 0.2,
      shipping: 8,
      discount: 0,
      total: products[7].price + (products[7].price * 0.2) + 8,
      currency: 'XAF'
    },
    notes: 'Commande en cours de traitement',
    customerNotes: 'Merci de me tenir informé du suivi',
    adminNotes: 'En attente de confirmation PayPal',
    statusHistory: [
      {
        status: ORDER_STATUS.PENDING,
        timestamp: '2024-01-05T00:00:00.000Z',
        note: 'Commande créée'
      },
      {
        status: ORDER_STATUS.PROCESSING,
        timestamp: '2024-01-05T10:00:00.000Z',
        note: 'Commande mise en préparation'
      }
    ],
    canReview: false,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T10:00:00.000Z'
  }
];