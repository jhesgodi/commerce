const nftCollections = [
  {
    id: 'stickers',
    name: 'Stickers',
    description: 'A collection of stickers',
    image: 'https://jhesgodi.github.io/stickers-shop-metadata/collection.webp',
    contractAddress: '0x8f66467cd214ce192b290634181fbd9fd385d144',
    contractType: 'ERC1155',
    productIds: ['1', '2', '3']
  },
  {
    id: 'countryflags',
    name: 'Country Flags',
    description: 'A collection of flags',
    image: 'https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-9-scaled.jpg',
    contractAddress: '0x9a6A79Bc6593E5Bad64C93f3F56b4BaB844a122F',
    contractType: 'ERC721',
    productIds: ['4', '5', '6']
  }
];

export default nftCollections;
