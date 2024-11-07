// eslint-disable-next-line no-shadow
export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface Options {
    headers?: Record<string, string>;
    method?: RequestMethods;
    data?: any;
    timeout?: number;
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

function queryStringify(data: Record<string, unknown>): string {
  return `?${Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&')}`;
}

export class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: RequestMethods.GET }, options?.timeout);

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: RequestMethods.POST }, options?.timeout);

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: RequestMethods.PUT }, options?.timeout);

  delete: HTTPMethod = (url, options) => this.request(url, {
    ...options,
    method: RequestMethods.DELETE,
  }, options?.timeout);

  // eslint-disable-next-line class-methods-use-this
  request(url: string, options: Options = {}, timeout = 10000) {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === RequestMethods.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function handleLoad() {
        resolve(xhr);
      };

      xhr.onabort = function handleAbort() {
        reject(new Error('Request aborted'));
      };

      xhr.onerror = function handleError() {
        reject(new Error('Network error'));
      };

      xhr.timeout = timeout;
      xhr.ontimeout = function handleTimeout() {
        reject(new Error('Request timeout'));
      };

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
