export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpServiceOptions {
  baseURL?: string;
  headers?: Record<string, string>;
}

export class HttpService {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(options?: HttpServiceOptions) {
    if (!options?.baseURL) {
      throw new Error('Base URL is required');
    }

    this.baseURL = options.baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    };
  }

  private sanitizeUrl(url: string): string {
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  private async request<T>(method: HttpMethod, url: string, body?: unknown): Promise<T> {
    const fullUrl = this.sanitizeUrl(`${this.baseURL}/${url}`);
    const options: RequestInit = {
      method,
      headers: this.headers
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(fullUrl, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('HTTP request failed:', error);
      throw error;
    }
  }

  public get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url);
  }

  public post<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>('POST', url, body);
  }

  public put<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>('PUT', url, body);
  }

  public delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }
}

export default HttpService;
