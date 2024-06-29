import { Category } from 'lib/types';

const categories: Category[] = [
  {
    slug: 'featured',
    path: '/search/featured',
    title: 'Featured',
    description: 'Featured products',
    productIds: ['P010', 'P020', 'P030'],
    updatedAt: '2021-01-01T00:00:00Z',
    createdAt: '2021-01-01T00:00:00Z'
  },
  {
    slug: 'carousel',
    path: '/search/carousel',
    title: 'Carousel',
    description: 'Carousel products',
    productIds: ['P040', 'P050', 'P060'],
    updatedAt: '2021-01-01T00:00:00Z',
    createdAt: '2021-01-01T00:00:00Z'
  },
  {
    slug: 'erc1155',
    path: '/search/erc1155',
    title: 'ERC1155',
    description: 'ERC1155 products',
    productIds: ['P010', 'P020', 'P030'],
    updatedAt: '2021-01-01T00:00:00Z',
    createdAt: '2021-01-01T00:00:00Z'
  },
  {
    slug: 'erc721',
    path: '/search/erc721',
    title: 'ERC721',
    description: 'ERC721 products',
    productIds: ['P040', 'P050', 'P060'],
    updatedAt: '2021-01-01T00:00:00Z',
    createdAt: '2021-01-01T00:00:00Z'
  }
];

export default categories;
