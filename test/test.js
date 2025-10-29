const HttpClient = require('../index');
const assert = require('assert');

// Simple test runner
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Running Node HTTP Class Tests\n');
    
    for (const test of this.tests) {
      try {
        console.log(`⏳ ${test.name}...`);
        await test.fn();
        console.log(`✅ ${test.name} - PASSED\n`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${test.name} - FAILED`);
        console.log(`   Error: ${error.message}\n`);
        this.failed++;
      }
    }

    console.log(`📊 Test Results:`);
    console.log(`   Passed: ${this.passed}`);
    console.log(`   Failed: ${this.failed}`);
    console.log(`   Total:  ${this.tests.length}`);
    
    if (this.failed === 0) {
      console.log('\n🎉 All tests passed!');
    } else {
      console.log('\n⚠️  Some tests failed.');
      process.exit(1);
    }
  }
}

const runner = new TestRunner();

// Test 1: Basic GET request
runner.test('Basic GET Request', async () => {
  const client = new HttpClient();
  const response = await client.get('https://jsonplaceholder.typicode.com/posts/1');
  
  assert.strictEqual(response.status, 200);
  assert(response.data);
  assert(response.data.id);
  assert(response.data.title);
});

// Test 2: POST request with data
runner.test('POST Request with Data', async () => {
  const client = new HttpClient();
  const postData = {
    title: 'Test Post',
    body: 'This is a test post',
    userId: 1
  };
  
  const response = await client.post('https://jsonplaceholder.typicode.com/posts', postData);
  
  assert.strictEqual(response.status, 201);
  assert.strictEqual(response.data.title, postData.title);
  assert.strictEqual(response.data.body, postData.body);
  assert.strictEqual(response.data.userId, postData.userId);
});

// Test 3: PUT request
runner.test('PUT Request', async () => {
  const client = new HttpClient();
  const putData = {
    id: 1,
    title: 'Updated Test Post',
    body: 'This is an updated test post',
    userId: 1
  };
  
  const response = await client.put('https://jsonplaceholder.typicode.com/posts/1', putData);
  
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.title, putData.title);
  assert.strictEqual(response.data.body, putData.body);
});

// Test 4: PATCH request
runner.test('PATCH Request', async () => {
  const client = new HttpClient();
  const patchData = {
    title: 'Patched Title'
  };
  
  const response = await client.patch('https://jsonplaceholder.typicode.com/posts/1', patchData);
  
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.title, patchData.title);
});

// Test 5: DELETE request
runner.test('DELETE Request', async () => {
  const client = new HttpClient();
  const response = await client.delete('https://jsonplaceholder.typicode.com/posts/1');
  
  assert.strictEqual(response.status, 200);
});

// Test 6: HEAD request
runner.test('HEAD Request', async () => {
  const client = new HttpClient();
  const response = await client.head('https://jsonplaceholder.typicode.com/posts/1');
  
  assert.strictEqual(response.status, 200);
  assert(response.headers);
  assert(response.headers['content-type']);
});

// Test 7: Custom headers
runner.test('Custom Headers', async () => {
  const client = new HttpClient();
  const customHeaders = {
    'X-Test-Header': 'test-value',
    'Authorization': 'Bearer test-token'
  };
  
  const response = await client.get('https://httpbin.org/headers', {
    headers: customHeaders
  });
  
  assert.strictEqual(response.status, 200);
  assert(response.data.headers['X-Test-Header']);
  assert(response.data.headers['Authorization']);
});

// Test 8: Default headers
runner.test('Default Headers', async () => {
  const client = new HttpClient({
    headers: {
      'X-Default-Header': 'default-value'
    }
  });
  
  const response = await client.get('https://httpbin.org/headers');
  
  assert.strictEqual(response.status, 200);
  assert(response.data.headers['X-Default-Header']);
});

// Test 9: Setting default headers
runner.test('Setting Default Headers', async () => {
  const client = new HttpClient();
  client.setDefaultHeaders({
    'X-New-Default': 'new-value'
  });
  
  const response = await client.get('https://httpbin.org/headers');
  
  assert.strictEqual(response.status, 200);
  assert(response.data.headers['X-New-Default']);
});

// Test 10: Creating new instance
runner.test('Creating New Instance', async () => {
  const client = new HttpClient();
  const newClient = client.create({
    headers: {
      'X-Instance-Header': 'instance-value'
    }
  });
  
  const response = await newClient.get('https://httpbin.org/headers');
  
  assert.strictEqual(response.status, 200);
  assert(response.data.headers['X-Instance-Header']);
});

// Test 11: Error handling - 404
runner.test('Error Handling - 404', async () => {
  const client = new HttpClient();
  
  try {
    await client.get('https://jsonplaceholder.typicode.com/posts/99999');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert(error.response);
    assert.strictEqual(error.response.status, 404);
  }
});

// Test 12: Timeout handling
runner.test('Timeout Handling', async () => {
  const client = new HttpClient({ timeout: 1 }); // 1ms timeout
  
  try {
    await client.get('https://httpbin.org/delay/2');
    assert.fail('Should have thrown a timeout error');
  } catch (error) {
    assert(error.message.includes('timeout') || error.message.includes('TIMEOUT'));
  }
});

// Test 13: JSON parsing
runner.test('JSON Response Parsing', async () => {
  const client = new HttpClient();
  const response = await client.get('https://jsonplaceholder.typicode.com/posts/1');
  
  assert.strictEqual(response.status, 200);
  assert.strictEqual(typeof response.data, 'object');
  assert(response.data.id);
  assert(response.data.title);
});

// Test 14: Non-JSON response handling
runner.test('Non-JSON Response Handling', async () => {
  const client = new HttpClient();
  const response = await client.get('https://httpbin.org/html');
  
  assert.strictEqual(response.status, 200);
  assert.strictEqual(typeof response.data, 'string');
  assert(response.data.includes('<html>'));
});

// Test 15: Constructor options
runner.test('Constructor Options', async () => {
  const client = new HttpClient({
    timeout: 10000,
    headers: {
      'X-Constructor-Test': 'constructor-value'
    }
  });
  
  const response = await client.get('https://httpbin.org/headers');
  
  assert.strictEqual(response.status, 200);
  assert(response.data.headers['X-Constructor-Test']);
});

// Run tests if this file is executed directly
if (require.main === module) {
  runner.run().catch(console.error);
}

module.exports = runner;