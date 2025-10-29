# Node HTTP Class

A simple and elegant HTTP client class for Node.js with a promise-based API. This package provides a clean interface for making HTTP requests without external dependencies.

## Author

**Vega Freelanceuideveloper**
- 🌐 GitHub: [@freelanceuideveloper](https://github.com/freelanceuideveloper)
- 📧 Email: iam@freelanceuideveloper.com
- 💼 Portfolio: [freelanceuideveloper.com]

## Features

- ✅ Promise-based API
- ✅ Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD)
- ✅ Automatic JSON parsing
- ✅ Configurable timeouts
- ✅ Custom headers support
- ✅ TypeScript declarations included
- ✅ No external dependencies
- ✅ Support for both HTTP and HTTPS
- ✅ Error handling with detailed response information

## Installation

```bash
npm install node-http-class
```

## Quick Start

```javascript
const HttpClient = require('node-http-class');

// Create a new instance
const client = new HttpClient();

// Make a GET request
client.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

## Usage

### Basic Usage

```javascript
const HttpClient = require('node-http-class');

// Create an instance with default options
const client = new HttpClient({
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  }
});
```

### HTTP Methods

#### GET Request
```javascript
// Simple GET request
const response = await client.get('https://api.example.com/users');

// GET with custom headers
const response = await client.get('https://api.example.com/users', {
  headers: {
    'Accept': 'application/json'
  }
});
```

#### POST Request
```javascript
// POST with JSON data
const response = await client.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// POST with custom headers
const response = await client.post('https://api.example.com/users', 
  { name: 'John Doe' },
  {
    headers: {
      'Authorization': 'Bearer token'
    }
  }
);
```

#### PUT Request
```javascript
const response = await client.put('https://api.example.com/users/1', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

#### PATCH Request
```javascript
const response = await client.patch('https://api.example.com/users/1', {
  email: 'newemail@example.com'
});
```

#### DELETE Request
```javascript
const response = await client.delete('https://api.example.com/users/1');
```

#### HEAD Request
```javascript
const response = await client.head('https://api.example.com/users/1');
console.log('Headers:', response.headers);
```

### Configuration

#### Setting Default Headers
```javascript
client.setDefaultHeaders({
  'Authorization': 'Bearer new-token',
  'X-Custom-Header': 'custom-value'
});
```

#### Setting Default Timeout
```javascript
client.setTimeout(15000); // 15 seconds
```

#### Creating New Instance with Custom Options
```javascript
const apiClient = client.create({
  timeout: 30000,
  headers: {
    'API-Key': 'your-api-key'
  }
});
```

### Response Object

Each successful request returns a response object with the following properties:

```javascript
{
  data: any,           // Parsed response body (JSON parsed if applicable)
  status: number,      // HTTP status code
  statusText: string,  // HTTP status message
  headers: object,     // Response headers
  config: object,      // Request configuration
  request: object      // Request object
}
```

### Error Handling

```javascript
try {
  const response = await client.get('https://api.example.com/users');
  console.log(response.data);
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
  } else {
    // Network error or timeout
    console.log('Error:', error.message);
  }
}
```

### Using with async/await vs Promises

#### With async/await (Recommended)
```javascript
async function fetchUser(id) {
  try {
    const response = await client.get(`https://api.example.com/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw error;
  }
}
```

#### With Promises
```javascript
function fetchUser(id) {
  return client.get(`https://api.example.com/users/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch user:', error.message);
      throw error;
    });
}
```

## TypeScript Support

This package includes TypeScript declarations. You can use it with full type support:

```typescript
import HttpClient, { HttpResponse } from 'node-http-class';

interface User {
  id: number;
  name: string;
  email: string;
}

const client = new HttpClient();

// Typed response
const response: HttpResponse<User> = await client.get<User>('/api/users/1');
const user: User = response.data;
```

## API Reference

### Constructor

```javascript
new HttpClient(options?)
```

**Options:**
- `timeout` (number): Default timeout in milliseconds (default: 5000)
- `headers` (object): Default headers for all requests

### Methods

#### `request(method, url, options?)`
Make a generic HTTP request.

#### `get(url, options?)`
Make a GET request.

#### `post(url, data?, options?)`
Make a POST request.

#### `put(url, data?, options?)`
Make a PUT request.

#### `patch(url, data?, options?)`
Make a PATCH request.

#### `delete(url, options?)`
Make a DELETE request.

#### `head(url, options?)`
Make a HEAD request.

#### `setDefaultHeaders(headers)`
Set default headers for all requests.

#### `setTimeout(timeout)`
Set default timeout for all requests.

#### `create(options?)`
Create a new instance with different default options.

## Examples

See the `examples` directory for more usage examples.

## Requirements

- Node.js >= 12.0.0

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### 1.0.0
- Initial release
- Support for all HTTP methods
- Promise-based API
- TypeScript declarations
- Configurable timeouts and headers