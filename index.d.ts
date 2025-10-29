export interface HttpClientOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  data?: any;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: any;
  request: any;
}

export declare class HttpClient {
  constructor(options?: HttpClientOptions);
  
  request<T = any>(
    method: string,
    url: string,
    options?: RequestOptions
  ): Promise<HttpResponse<T>>;
  
  get<T = any>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>;
  
  post<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<HttpResponse<T>>;
  
  put<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<HttpResponse<T>>;
  
  patch<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<HttpResponse<T>>;
  
  delete<T = any>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>;
  
  head<T = any>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>;
  
  setDefaultHeaders(headers: Record<string, string>): void;
  
  setTimeout(timeout: number): void;
  
  create(options?: HttpClientOptions): HttpClient;
}

declare const httpClient: HttpClient;

export = HttpClient;
export { httpClient as default };