/* eslint-disable no-unused-vars */
import {
  Cart,
  Category,
  GetProductsByCategoryParams,
  GetProductsParams,
  LineItem,
  Menu,
  Page,
  Product
} from 'lib/types';
import { DataService } from 'lib/utils/data-service';
import HttpService, { HttpServiceOptions } from 'lib/utils/http-service';

export class SimpleSalesService extends DataService {
  private httpService!: HttpService;

  constructor(httpService?: HttpService, httpServiceOptions?: HttpServiceOptions) {
    super();
    this.httpService = httpService || new HttpService(httpServiceOptions);
  }

  async createCart(): Promise<Cart> {
    // Implementation here
    this.httpService.post<Cart>('/cart', {});
    throw new Error('Method not implemented.');
  }

  async addToCart(cartId: string, lineItems: LineItem[]): Promise<Cart> {
    // Implementation here
    this.httpService.post<Cart>(`/cart/${cartId}/items/add`, lineItems);
    throw new Error('Method not implemented.');
  }

  async removeFromCart(cartId: string, lineItemIds: string[]): Promise<Cart> {
    // Implementation here
    this.httpService.post<Cart>(`/cart/${cartId}/items/remove`, lineItemIds);
    throw new Error('Method not implemented.');
  }

  async updateCart(cartId: string, lineItems: LineItem[]): Promise<Cart> {
    // Implementation here
    this.httpService.post<Cart>(`/cart/${cartId}/items/update`, lineItems);
    throw new Error('Method not implemented.');
  }

  async getCart(cartId: string): Promise<Cart | undefined> {
    // Implementation here
    this.httpService.get<Cart>(`/cart/${cartId}`);
    throw new Error('Method not implemented.');
  }

  async getCategory(handle: string): Promise<Category | undefined> {
    // Implementation here
    this.httpService.get<Category>(`/category/${handle}`);
    throw new Error('Method not implemented.');
  }

  async getProductsByCategory(params: GetProductsByCategoryParams): Promise<Product[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getCategories(): Promise<Category[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getMenu(handle: string): Promise<Menu[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getPage(handle: string): Promise<Page> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getPages(): Promise<Page[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getProduct(handle: string): Promise<Product | undefined> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getSimilarProducts(productId: string): Promise<Product[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getProducts(params: GetProductsParams): Promise<Product[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }
}
