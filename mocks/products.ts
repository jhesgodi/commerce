import { Product } from 'lib/types';
const products: Product[] = [
  {
    id: 'P010',
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
    stock: 1000,
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
        id: 'P011',
        title: 'Pink Blob - Common',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'common'
          }
        ],
        price: {
          amount: '5',
          currency: 'USD'
        }
      },
      {
        id: 'P012',
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
        id: 'P013',
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
    id: 'P020',
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
    stock: 1000,
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
        id: 'P021',
        title: 'Green Blob - Common',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'rarity',
            value: 'common'
          }
        ],
        price: {
          amount: '3',
          currency: 'USD'
        }
      },
      {
        id: 'P022',
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
        id: 'P023',
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
    id: 'P030',
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
    stock: 1000,
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
        id: 'P032',
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
        id: 'P033',
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
  },
  {
    id: 'P040',
    slug: 'flag-colombia',
    title: 'Colombia',
    description: 'Flag of Colombia',
    descriptionHtml: '<p>Flag of Colombia</p>',
    image: {
      url: 'https://www.countryflags.com/wp-content/uploads/colombia-flag-png-large.png',
      altText: 'Flag of Colombia - default image',
      width: 1000,
      height: 667
    },
    images: [],
    stock: 1000,
    inStock: true,
    options: [],
    price: {
      amount: '1',
      currency: 'USD'
    },
    seo: {
      title: 'Flag of Colombia',
      description: 'Flag of Colombia'
    },
    tags: [],
    variants: [],
    updatedAt: '1719186914540',
    createdAt: '1719186914530'
  },
  {
    id: 'P050',
    slug: 'flag-brazil',
    title: 'Brazil',
    description: 'Flag of Brazil',
    descriptionHtml: '<p>Flag of Brazil</p>',
    image: {
      url: 'https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png',
      altText: 'Flag of Brazil - default image',
      width: 1000,
      height: 667
    },
    images: [],
    stock: 1000,
    inStock: true,
    options: [],
    price: {
      amount: '1',
      currency: 'USD'
    },
    seo: {
      title: 'Flag of Brazil',
      description: 'Flag of Brazil'
    },
    tags: [],
    variants: [],
    updatedAt: '1719186914540',
    createdAt: '1719186914530'
  },
  {
    id: 'P060',
    slug: 'flag-korea',
    title: 'Korea',
    description: 'Flag of Korea',
    descriptionHtml: '<p>Flag of Korea</p>',
    image: {
      url: 'https://www.countryflags.com/wp-content/uploads/south-korea-flag-png-large.png',
      altText: 'Flag of Korea - default image',
      width: 1000,
      height: 667
    },
    images: [],
    stock: 1000,
    inStock: true,
    options: [],
    price: {
      amount: '1',
      currency: 'USD'
    },
    seo: {
      title: 'Flag of Korea',
      description: 'Flag of Korea'
    },
    tags: [],
    variants: [],
    updatedAt: '1719186914540',
    createdAt: '1719186914530'
  }
];

export default products;
