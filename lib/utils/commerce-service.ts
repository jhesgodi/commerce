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
  public dataService!: DataService;

  public constructor(dataService: DataService) {
    super();
    this.dataService = dataService;
  }

  public createCart(): Promise<Cart> {
    return this.dataService.createCart();
  }

  public addToCart(cartId: string, lineItems: any): Promise<Cart> {
    return this.dataService.addToCart(cartId, lineItems);
  }

  public removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    return this.dataService.removeFromCart(cartId, lineIds);
  }

  public updateCart(cartId: string, lineItems: any): Promise<Cart> {
    return this.dataService.updateCart(cartId, lineItems);
  }

  public getCart(cartId: string): Promise<Cart | undefined> {
    return this.dataService.getCart(cartId);
  }

  public getCategory(handle: string): Promise<Category | undefined> {
    return this.dataService.getCategory(handle);
  }

  public getProductsByCategory(params: GetProductsByCategoryParams): Promise<Product[]> {
    return this.dataService.getProductsByCategory(params);
  }

  public getCategories(): Promise<Category[]> {
    return this.dataService.getCategories();
  }

  public getMenu(handle: string): Promise<Menu[]> {
    return this.dataService.getMenu(handle);
  }

  public getPage(handle: string): Promise<Page> {
    return this.dataService.getPage(handle);
  }

  public getPages(): Promise<Page[]> {
    return this.dataService.getPages();
  }

  public getProduct(handle: string): Promise<Product | undefined> {
    return this.dataService.getProduct(handle);
  }

  public getProducts(params: GetProductsParams): Promise<Product[]> {
    return this.dataService.getProducts(params);
  }

  public getSimilarProducts(productId: string): Promise<Product[]> {
    return this.dataService.getSimilarProducts(productId);
  }
}
