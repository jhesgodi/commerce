const nftCollections = [
  {
    id: 'stickers',
    name: 'Stickers',
    description: 'A collection of stickers',
    image: 'https://jhesgodi.github.io/stickers-shop-metadata/collection.webp',
    contractAddress: '0x14113F9c95F002AB11424F913058913E996933DE',
    contractType: 'ERC1155',
    productIds: ['P010', 'P020', 'P030']
  },
  {
    id: 'countryflags',
    name: 'Country Flags',
    description: 'A collection of flags',
    image: 'https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-9-scaled.jpg',
    contractAddress: '0x9a6A79Bc6593E5Bad64C93f3F56b4BaB844a122F',
    contractType: 'ERC721',
    productIds: ['P040', 'P050', 'P060']
  }
];

export default nftCollections;
