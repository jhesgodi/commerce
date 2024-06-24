import { Menu } from 'lib/types';

const menus: Record<string, Menu[]> = {
  'header-menu': [
    {
      title: 'all products',
      path: '/search'
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
