const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

/**
 * Simple HTTP Client Class
 */
class HttpClient {
  constructor(options = {}) {
    this.defaultOptions = {
      timeout: 5000,
      headers: {
        'User-Agent': 'Node-HTTP-Class/1.0.0',
        'Content-Type': 'application/json'
      },
      ...options
    };
  }

  request(method, requestUrl, options = {}) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(requestUrl);
      const isHttps = parsedUrl.protocol === 'https:';
      const httpModule = isHttps ? https : http;

      const requestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (isHttps ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: method.toUpperCase(),
        headers: {
          ...this.defaultOptions.headers,
          ...options.headers
        },
        timeout: options.timeout || this.defaultOptions.timeout
      };

      // Handle request body
      let postData = null;
      if (options.data) {
        if (typeof options.data === 'object') {
          postData = JSON.stringify(options.data);
          requestOptions.headers['Content-Length'] = Buffer.byteLength(postData);
        } else {
          postData = options.data;
          requestOptions.headers['Content-Length'] = Buffer.byteLength(postData);
        }
      }

      const req = httpModule.request(requestOptions, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          let parsedData;
          try {
            parsedData = JSON.parse(responseData);
          } catch (e) {
            parsedData = responseData;
          }

          const response = {
            data: parsedData,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config: requestOptions,
            request: req
          };

          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            const error = new Error(`Request failed with status ${res.statusCode}`);
            error.response = response;
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.abort();
        reject(new Error('Request timeout'));
      });

      // Write data to request body
      if (postData) {
        req.write(postData);
      }

      req.end();
    });
  }

  get(url, options = {}) {
    return this.request('GET', url, options);
  }

  post(url, data, options = {}) {
    return this.request('POST', url, { ...options, data });
  }

  put(url, data, options = {}) {
    return this.request('PUT', url, { ...options, data });
  }

  patch(url, data, options = {}) {
    return this.request('PATCH', url, { ...options, data });
  }

  delete(url, options = {}) {
    return this.request('DELETE', url, options);
  }

  head(url, options = {}) {
    return this.request('HEAD', url, options);
  }


  setDefaultHeaders(headers) {
    this.defaultOptions.headers = {
      ...this.defaultOptions.headers,
      ...headers
    };
  }

  setTimeout(timeout) {
    this.defaultOptions.timeout = timeout;
  }

  create(options = {}) {
    return new HttpClient({
      ...this.defaultOptions,
      ...options
    });
  }
}

// Create a default instance
const httpClient = new HttpClient();


module.exports = HttpClient;
module.exports.default = httpClient;
module.exports.HttpClient = HttpClient;