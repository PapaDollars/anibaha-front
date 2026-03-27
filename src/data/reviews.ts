import { products } from '@/data/products';
import { users } from '@/data/users';

export interface Review {
  id: string;
  product: typeof products[0];
  user: typeof users[0];
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    product: products[0],
    user: users[0],
    rating: 5,
    comment: 'Excellent produit, je suis très satisfait de mon achat !',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    product: products[1],
    user: users[1],
    rating: 4,
    comment: 'Très bon ordinateur portable, mais un peu cher.',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    product: products[2],
    user: users[2],
    rating: 5,
    comment: 'Le meilleur casque que j\'ai jamais eu !',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    product: products[3],
    user: users[3],
    rating: 3,
    comment: 'Bonne montre mais l\'autonomie pourrait être meilleure.',
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    product: products[4],
    user: users[4],
    rating: 4,
    comment: 'Tablette légère et performante, parfaite pour le travail.',
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z',
  },
]; 