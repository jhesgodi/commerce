export type Product = {
  id: string;
  name: string;
  price: Price;
  stock: number;
  image: Image;
};

export type LineItem = {
  id: string;
  quantity: number;
  price?: Price;
  variantId?: string;
};

export type Order = {
  id: string;
  status: string;
  products: LineItem[];
  total: Price;
};

export type Image = {
  url: string;
  altText: string;
};

export type Price = {
  amount: number;
  currency: string;
};

export type Cart = {
  id: string;
  // Define the properties of Cart
};

export type Category = {
  // Define the properties of Collection
};

export type Menu = {
  // Define the properties of Menu
};

export type Page = {
  // Define the properties of Page
};

export type GetProductsByCategoryParams = {
  // Define the properties of the parameters needed to get products by category
};

export type GetProductsParams = {
  // Define the properties of the parameters needed to get products
};
