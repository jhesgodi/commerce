import { Cart } from '../types';
import { DataService } from './data-service';

import {
  Category,
  GetProductsByCategoryParams,
  GetProductsParams,
  Menu,
  Page,
  Product
} from '../types';

/** DO NOT CHANGE THIS CLASS
 * Instead implement your own Service extending DataService class
 * and provide it to this CommerceService class constructor
 **/
export class CommerceService extends DataService {
  public commerce!: DataService;

  public constructor(service: DataService) {
    super();
    this.commerce = service;
  }

  public createCart(): Promise<Cart> {
    return this.commerce.createCart();
  }

  public addToCart(cartId: string, lineItems: any): Promise<Cart> {
    return this.commerce.addToCart(cartId, lineItems);
  }

  public removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    return this.commerce.removeFromCart(cartId, lineIds);
  }

  public updateCart(cartId: string, lineItems: any): Promise<Cart> {
    return this.commerce.updateCart(cartId, lineItems);
  }

  public getCart(cartId: string): Promise<Cart | undefined> {
    return this.commerce.getCart(cartId);
  }

  public getCategory(handle: string): Promise<Category | undefined> {
    return this.commerce.getCategory(handle);
  }

  public getProductsByCategory(params: GetProductsByCategoryParams): Promise<Product[]> {
    return this.commerce.getProductsByCategory(params);
  }

  public getCategories(): Promise<Category[]> {
    return this.commerce.getCategories();
  }

  public getMenu(handle: string): Promise<Menu[]> {
    return this.commerce.getMenu(handle);
  }

  public getPage(handle: string): Promise<Page> {
    return this.commerce.getPage(handle);
  }

  public getPages(): Promise<Page[]> {
    return this.commerce.getPages();
  }

  public getProduct(handle: string): Promise<Product | undefined> {
    return this.commerce.getProduct(handle);
  }

  public getProductRecommendations(productId: string): Promise<Product[]> {
    return this.commerce.getProductRecommendations(productId);
  }

  public getProducts(params: GetProductsParams): Promise<Product[]> {
    return this.commerce.getProducts(params);
  }
}
