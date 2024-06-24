import { Product } from 'lib/types';
const products: Product[] = [
  {
    id: '1',
    slug: 'pink-blob',
    title: 'Pink Blob',
    description: 'A three-dimensional pink blob.',
    descriptionHtml: '<p>A three-dimensional pink blob.</p>',
    image: {
      url: 'https://immutable.github.io/sample-project-metadata/tokens/token1.webp',
      altText: 'Pink Blob - default image',
      width: 1200,
      height: 1200
    },
    images: [
      {
        url: 'https://immutable.github.io/sample-project-metadata/tokens/token1.webp',
        altText: 'Pink Blob - Alternate image',
        width: 1200,
        height: 1200
      }
    ],
    stock: 10,
    inStock: true,
    options: [
      {
        id: '1',
        name: 'rarity',
        values: ['common', 'rare', 'legendary']
      }
    ],
    price: {
      amount: '5',
      currency: 'USD'
    },
    seo: {
      title: 'Pink Blob',
      description: 'A three-dimensional pink blob.'
    },
    tags: [],
    variants: [
      {
        id: 'pink-blob-common',
        title: 'Pink Blob - Common',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'rare'
          }
        ],
        price: {
          amount: '5',
          currency: 'USD'
        }
      },
      {
        id: 'pink-blob-rare',
        title: 'Pink Blob - Rare',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'rare'
          }
        ],
        price: {
          amount: '10',
          currency: 'USD'
        }
      },
      {
        id: 'pink-blob-legendary',
        title: 'Pink Blob - Legendary',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'legendary'
          }
        ],
        price: {
          amount: '15',
          currency: 'USD'
        }
      }
    ],
    updatedAt: '1719186914540',
    createdAt: '1719186914530'
  },
  {
    id: '2',
    slug: 'green-blob',
    title: 'Green Blob',
    description: 'A three-dimensional green blob.',
    descriptionHtml: '<p>A three-dimensional green blob.</p>',
    image: {
      url: 'https://immutable.github.io/sample-project-metadata/tokens/token2.webp',
      altText: 'Green Blob - default image',
      width: 1200,
      height: 1200
    },
    images: [
      {
        url: 'https://immutable.github.io/sample-project-metadata/tokens/token2.webp',
        altText: 'Green Blob - Alternate image',
        width: 1200,
        height: 1200
      }
    ],
    stock: 10,
    inStock: true,
    options: [
      {
        id: '1',
        name: 'rarity',
        values: ['common', 'rare', 'legendary']
      }
    ],
    price: {
      amount: '3',
      currency: 'USD'
    },
    seo: {
      title: 'Product 2',
      description: 'Product 2 description'
    },
    tags: [],
    variants: [
      {
        id: 'green-blob-common',
        title: 'Green Blob - Common',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'rare'
          }
        ],
        price: {
          amount: '3',
          currency: 'USD'
        }
      },
      {
        id: 'green-blob-rare',
        title: 'Green Blob - Rare',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'rare'
          }
        ],
        price: {
          amount: '8',
          currency: 'USD'
        }
      },
      {
        id: 'green-blob-legendary',
        title: 'Green Blob - Legendary',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'legendary'
          }
        ],
        price: {
          amount: '21',
          currency: 'USD'
        }
      }
    ],
    updatedAt: '1719186914560',
    createdAt: '1719186914550'
  },
  {
    id: '3',
    slug: 'aqua-blob',
    title: 'Aqua Blob',
    description: 'A three-dimensional aqua blob.',
    descriptionHtml: '<p>A three-dimensional aqua blob.</p>',
    image: {
      url: 'https://immutable.github.io/sample-project-metadata/tokens/token3.webp',
      altText: 'Aqua Blob - default image',
      width: 1200,
      height: 1200
    },
    images: [
      {
        url: 'https://immutable.github.io/sample-project-metadata/tokens/token3.webp',
        altText: 'Aqua Blob - Alternate image',
        width: 1200,
        height: 1200
      }
    ],
    stock: 10,
    inStock: true,
    options: [
      {
        id: '1',
        name: 'rarity',
        values: ['rare', 'legendary']
      }
    ],
    price: {
      amount: '10',
      currency: 'USD'
    },
    seo: {
      title: 'Product 3',
      description: 'Product 3 description'
    },
    tags: [],
    variants: [
      {
        id: 'aqua-blob-rare',
        title: 'Aqua Blob - Rare',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'rare'
          }
        ],
        price: {
          amount: '20',
          currency: 'USD'
        }
      },
      {
        id: 'aqua-blob-legendary',
        title: 'Aqua Blob - Legendary',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'legendary'
          }
        ],
        price: {
          amount: '50',
          currency: 'USD'
        }
      }
    ],
    updatedAt: '1719186914515',
    createdAt: '1719186914510'
  }
];

export default products;
