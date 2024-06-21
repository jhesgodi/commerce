export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: Money;
  stock: number;
  image: Image;
  images: Image[];
  seo: {
    title: string;
    description: string;
  };
  tags?: string[];
  inStock: boolean;
  options: ProductOption[];
  variants: ProductVariant[];
  descriptionHtml: string;
  updatedAt: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type LineItem = {
  id: string;
  quantity: number;
  price?: Money;
  variantId?: string;
};

export type Order = {
  id: string;
  status: string;
  products: LineItem[];
  total: Money;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Money = {
  amount: string;
  currency: string;
};

export type Cart = {
  id: string;
  cost: Money;
  tax: Money;
  lines: CartItem[];
  quantity: number;
  // Define the properties of Cart
};

export type CartItem = {
  id: string;
  cost: Money;
  quantity: number;
  title: string;
  image: Image;
  options: {
    name: string;
    value: string;
  }[];
};

export type Category = {
  slug: string;
  path: string;
  title: string;
  description: string;
  updatedAt: string;
  // Define the properties of Collection
};

export type Menu = {
  title: string;
  path: string;
};

export type Page = {
  slug: string;
  title: string;
  description: string;
  bodyHtml: string;
  createdAt: string;
  updatedAt: string;
  // Define the properties of Page
};

export type GetProductsByCategoryParams = {
  categoryId: string;
  // Define the properties of the parameters needed to get products by category
};

export type GetProductsParams = {
  // Define the properties of the parameters needed to get products
};
