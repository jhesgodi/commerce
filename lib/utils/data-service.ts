/* eslint-disable no-unused-vars */
import {
  Cart,
  Category,
  GetProductsByCategoryParams,
  LineItem,
  Menu,
  Page,
  Product
} from '../types';

export abstract class DataService {
  abstract createCart(): Promise<Cart>;

  abstract addToCart(cartId: string, lineItems: LineItem[]): Promise<Cart>;

  abstract removeFromCart(cartId: string, lineIds: string[]): Promise<Cart>;

  abstract updateCart(cartId: string, lineItems: LineItem[]): Promise<Cart>;

  abstract getCart(cartId: string): Promise<Cart | undefined>;

  abstract getCategory(handle: string): Promise<Category | undefined>;

  abstract getProductsByCategory(params: GetProductsByCategoryParams): Promise<Product[]>;

  abstract getCategories(): Promise<Category[]>;

  abstract getMenu(handle: string): Promise<Menu[]>;

  abstract getPage(handle: string): Promise<Page>;

  abstract getPages(): Promise<Page[]>;

  abstract getProduct(handle: string): Promise<Product | undefined>;

  abstract getSimilarProducts(productId: string): Promise<Product[]>;
}
