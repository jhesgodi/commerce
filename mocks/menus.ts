import { Menu } from 'lib/types';

const menus: Record<string, Menu[]> = {
  'header-menu': [
    {
      title: 'all products',
      path: '/search'
    },
    {
      title: "ERC721's",
      path: '/search/erc721'
    },
    {
      title: "ERC1155's",
      path: '/search/erc1155'
    }
  ],
  'footer-menu': [
    {
      title: 'home',
      path: '/'
    },
    {
      title: 'about',
      path: '/about'
    },
    {
      title: 'FAQs',
      path: '/faqs'
    }
  ]
};

export default menus;
