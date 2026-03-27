import { Cart, CartItem, WishlistItem } from '@/types/cart';
import { products } from '@/data/products';
import { users } from '@/data/users';

// Cart Items Data
export const cartItems: CartItem[] = [
  // Cart 1 - User 0
  {
    id: 'cart-item-1',
    productId: products[0].id,
    product: products[0],
    variantId: undefined,
    variant: undefined,
    quantity: 1,
    addedAt: '2024-01-01T08:30:00.000Z',
    unitPrice: products[0].price,
    totalPrice: products[0].price * 1
  },
  {
    id: 'cart-item-2',
    productId: products[2].id,
    product: products[2],
    variantId: undefined,
    variant: undefined,
    quantity: 2,
    addedAt: '2024-01-01T09:15:00.000Z',
    unitPrice: products[2].price,
    totalPrice: products[2].price * 2
  },
  // Cart 2 - User 1
  {
    id: 'cart-item-3',
    productId: products[1].id,
    product: products[1],
    variantId: undefined,
    variant: undefined,
    quantity: 1,
    addedAt: '2024-01-02T14:20:00.000Z',
    unitPrice: products[1].price,
    totalPrice: products[1].price * 1
  },
  // Cart 3 - User 2
  {
    id: 'cart-item-4',
    productId: products[3].id,
    product: products[3],
    variantId: undefined,
    variant: undefined,
    quantity: 1,
    addedAt: '2024-01-03T10:45:00.000Z',
    unitPrice: products[3].price,
    totalPrice: products[3].price * 1
  },
  {
    id: 'cart-item-5',
    productId: products[4].id,
    product: products[4],
    variantId: undefined,
    variant: undefined,
    quantity: 1,
    addedAt: '2024-01-03T11:30:00.000Z',
    unitPrice: products[4].price,
    totalPrice: products[4].price * 1
  },
  // Cart 4 - Guest user
  {
    id: 'cart-item-6',
    productId: products[5].id,
    product: products[5],
    variantId: undefined,
    variant: undefined,
    quantity: 3,
    addedAt: '2024-01-04T16:00:00.000Z',
    unitPrice: products[5].price,
    totalPrice: products[5].price * 3
  }
];

// Carts Data
export const carts: Cart[] = [
  {
    id: '1',
    userId: users[0].id,
    sessionId: undefined,
    items: [
      cartItems[0], // Air Max 270 x1
      cartItems[1]  // Ultraboost 22 x2
    ],
    subtotal: products[0].price + (products[2].price * 2),
    tax: (products[0].price + (products[2].price * 2)) * 0.2,
    taxRate: 0.2,
    shipping: 15,
    discount: 0,
    discountCode: undefined,
    total: (products[0].price + (products[2].price * 2)) + ((products[0].price + (products[2].price * 2)) * 0.2) + 15,
    currency: 'XAF',
    updatedAt: '2024-01-01T09:15:00.000Z',
    expiresAt: '2024-02-01T09:15:00.000Z'
  },
  {
    id: '2',
    userId: users[1].id,
    sessionId: undefined,
    items: [
      cartItems[2] // Dri-FIT T-Shirt x1
    ],
    subtotal: products[1].price,
    tax: products[1].price * 0.2,
    taxRate: 0.2,
    shipping: 8,
    discount: 5,
    discountCode: 'WELCOME5',
    total: products[1].price + (products[1].price * 0.2) + 8 - 5,
    currency: 'XAF',
    updatedAt: '2024-01-02T14:20:00.000Z',
    expiresAt: '2024-02-02T14:20:00.000Z'
  },
  {
    id: '3',
    userId: users[2].id,
    sessionId: undefined,
    items: [
      cartItems[3], // Ultraboost 22 x1
      cartItems[4]  // Tiro Track Jacket x1
    ],
    subtotal: products[3].price + products[4].price,
    tax: (products[3].price + products[4].price) * 0.2,
    taxRate: 0.2,
    shipping: 12,
    discount: 10,
    discountCode: 'STUDENT10',
    total: (products[3].price + products[4].price) + ((products[3].price + products[4].price) * 0.2) + 12 - 10,
    currency: 'XAF',
    updatedAt: '2024-01-03T11:30:00.000Z',
    expiresAt: '2024-02-03T11:30:00.000Z'
  },
  {
    id: '4',
    userId: undefined,
    sessionId: 'guest-session-abc123',
    items: [
      cartItems[5] // Smartwatch RS-X x3
    ],
    subtotal: products[5].price * 3,
    tax: (products[5].price * 3) * 0.2,
    taxRate: 0.2,
    shipping: 20,
    discount: 0,
    discountCode: undefined,
    total: (products[5].price * 3) + ((products[5].price * 3) * 0.2) + 20,
    currency: 'XAF',
    updatedAt: '2024-01-04T16:00:00.000Z',
    expiresAt: '2024-01-11T16:00:00.000Z' // Guest cart expires in 7 days
  }
];

// Wishlist Data
export const wishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    userId: users[0].id,
    productId: products[6].id,
    product: products[6],
    addedAt: '2024-01-01T10:00:00.000Z',
    notes: 'Pour ma salle de sport à domicile',
  },
  {
    id: 'wish-2',
    userId: users[0].id,
    productId: products[8].id,
    product: products[8],
    addedAt: '2024-01-02T15:30:00.000Z',
    notes: 'Cadeau pour ma femme',
  },
  {
    id: 'wish-3',
    userId: users[1].id,
    productId: products[10].id,
    product: products[10],
    addedAt: '2024-01-03T09:45:00.000Z',
    notes: undefined,
  },
  {
    id: 'wish-4',
    userId: users[1].id,
    productId: products[13].id,
    product: products[13],
    addedAt: '2024-01-04T11:20:00.000Z',
    notes: 'Pour mon nouveau vélo',
  },
  {
    id: 'wish-5',
    userId: users[2].id,
    productId: products[19].id,
    product: products[19],
    addedAt: '2024-01-05T14:15:00.000Z',
    notes: 'Pour mon bureau à domicile',
  },
  {
    id: 'wish-6',
    userId: users[2].id,
    productId: products[20].id,
    product: products[20],
    addedAt: '2024-01-06T16:00:00.000Z',
    notes: 'Style parfait pour mes sorties',
  },
  {
    id: 'wish-7',
    userId: users[3]?.id || 'user-4',
    productId: products[23].id,
    product: products[23],
    addedAt: '2024-01-07T12:30:00.000Z',
    notes: 'Parfum signature que je recherchais',
  },
  {
    id: 'wish-8',
    userId: users[4]?.id || 'user-5',
    productId: products[14].id,
    product: products[14],
    addedAt: '2024-01-08T17:45:00.000Z',
    notes: 'Pour les vacances d\'été',
  }
];