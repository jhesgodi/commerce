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
import { toCamelCase } from 'lib/utils/utils';

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
    const categories = (await import(`./mocks/categories`)).default;

    if (!categories) {
      throw new Error('Categories not found.');
    }

    const category = categories.find((category) => category.slug === handle);

    if (!category) {
      throw new Error(`Category not found. ${handle}`);
    }

    return category;
  }

  async getCategoryProducts(params: GetProductsByCategoryParams): Promise<Product[]> {
    const { categoryId } = params;

    const categories = (await import(`./mocks/categories`)).default;

    const category = categories.find((category) => category.slug === categoryId);

    if (!category) {
      throw new Error(`Category not found. ${categoryId}`);
    }

    const products = await this.getProducts({
      first: params.first,
      sortKey: params.sortKey,
      reverse: params.reverse
    });
    const categoryProducts = products.filter((product) => category.productIds.includes(product.id));

    return categoryProducts;
  }

  async getCategories(): Promise<Category[]> {
    const categories = (await import(`./mocks/categories`)).default;

    if (!categories) {
      throw new Error('Categories not found.');
    }

    return categories;
  }

  async getMenu(handle: string): Promise<Menu[]> {
    const menus = (await import(`./mocks/menus`)).default;
    const menu = menus?.[handle];

    if (!menu) {
      throw new Error(`Menu not found. ${handle}`);
    }

    return menu;
  }

  async getPage(handle: string): Promise<Page> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getPages(): Promise<Page[]> {
    // Implementation here
    throw new Error('Method not implemented.');
  }

  async getProduct(slug: string): Promise<Product | undefined> {
    const products = (await import(`./mocks/products`)).default;

    if (!products) {
      throw new Error('Products not found.');
    }

    const product = products.find((product) => product.slug === slug);

    if (!product) {
      throw new Error(`Product not found. ${slug}`);
    }

    return product;
  }

  async getProducts(params: GetProductsParams): Promise<Product[]> {
    const products = (await import(`./mocks/products`)).default;

    if (!products) {
      throw new Error('Products not found.');
    }

    let result = [...products];

    const { first = 1000, sortKey, reverse } = params;

    if (first && first < products.length) {
      result = products.slice(0, first);
    }

    if (sortKey) {
      const key = toCamelCase<keyof Product>(sortKey);

      const getSortValue = (product: Product) => {
        if (key === 'price') {
          return Number(product.price.amount);
        }

        if (key === 'createdAt') {
          return Number(product.createdAt);
        }

        return product[key];
      };

      result = products.sort((a, b) => {
        const aValue = getSortValue(a) || 0;
        const bValue = getSortValue(b) || 0;

        let returnValue = 0;
        if (aValue < bValue) {
          returnValue = -1;
        } else if (aValue > bValue) {
          returnValue = 1;
        }

        return reverse ? returnValue * -1 : returnValue;
      });
    }

    return result;
  }

  async getSimilarProducts(productId: string): Promise<Product[]> {
    return this.getProducts({ first: 3 });
  }
}
