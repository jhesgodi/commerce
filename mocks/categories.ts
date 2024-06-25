import { Category } from 'lib/types';

const categories: Category[] = [
  {
    slug: 'featured',
    path: '/search/featured',
    title: 'Featured',
    description: 'Featured products',
    productIds: ['1', '2', '3'],
    updatedAt: '2021-01-01T00:00:00Z',
    createdAt: '2021-01-01T00:00:00Z'
  },
  {
    slug: 'carousel',
    path: '/search/carousel',
    title: 'Carousel',
    description: 'Carousel products',
    productIds: ['1', '2', '3'],
    updatedAt: '2021-01-01T00:00:00Z',
    createdAt: '2021-01-01T00:00:00Z'
  }
];

export default categories;
