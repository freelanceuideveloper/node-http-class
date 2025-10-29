const HttpClient = require('../index');

async function runExamples() {
  console.log('🚀 Node HTTP Class Examples\n');

  // Create a client instance
  const client = new HttpClient({
    timeout: 10000,
    headers: {
      'User-Agent': 'Node-HTTP-Class-Example/1.0.0'
    }
  });

  try {
    // Example 1: GET request
    console.log('📥 Example 1: GET Request');
    const getResponse = await client.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status:', getResponse.status);
    console.log('Title:', getResponse.data.title);
    console.log('Body:', getResponse.data.body.substring(0, 50) + '...\n');

    // Example 2: POST request
    console.log('📤 Example 2: POST Request');
    const postData = {
      title: 'My New Post',
      body: 'This is the content of my new post created with Node HTTP Class',
      userId: 1
    };
    const postResponse = await client.post('https://jsonplaceholder.typicode.com/posts', postData);
    console.log('Status:', postResponse.status);
    console.log('Created Post ID:', postResponse.data.id);
    console.log('Created Title:', postResponse.data.title, '\n');

    // Example 3: PUT request
    console.log('🔄 Example 3: PUT Request');
    const putData = {
      id: 1,
      title: 'Updated Post Title',
      body: 'This post has been updated using PUT request',
      userId: 1
    };
    const putResponse = await client.put('https://jsonplaceholder.typicode.com/posts/1', putData);
    console.log('Status:', putResponse.status);
    console.log('Updated Title:', putResponse.data.title, '\n');

    // Example 4: PATCH request
    console.log('🔧 Example 4: PATCH Request');
    const patchData = {
      title: 'Partially Updated Title'
    };
    const patchResponse = await client.patch('https://jsonplaceholder.typicode.com/posts/1', patchData);
    console.log('Status:', patchResponse.status);
    console.log('Patched Title:', patchResponse.data.title, '\n');

    // Example 5: DELETE request
    console.log('🗑️  Example 5: DELETE Request');
    const deleteResponse = await client.delete('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status:', deleteResponse.status);
    console.log('Delete successful:', deleteResponse.status === 200, '\n');

    // Example 6: HEAD request
    console.log('📋 Example 6: HEAD Request');
    const headResponse = await client.head('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status:', headResponse.status);
    console.log('Content-Type:', headResponse.headers['content-type']);
    console.log('Server:', headResponse.headers.server, '\n');

    // Example 7: Custom headers
    console.log('🎯 Example 7: Custom Headers');
    const customResponse = await client.get('https://httpbin.org/headers', {
      headers: {
        'X-Custom-Header': 'MyCustomValue',
        'Authorization': 'Bearer fake-token'
      }
    });
    console.log('Status:', customResponse.status);
    console.log('Request Headers Sent:', customResponse.data.headers, '\n');

    // Example 8: Error handling
    console.log('⚠️  Example 8: Error Handling');
    try {
      await client.get('https://jsonplaceholder.typicode.com/posts/nonexistent');
    } catch (error) {
      if (error.response) {
        console.log('Error Status:', error.response.status);
        console.log('Error Message:', error.message);
      } else {
        console.log('Network Error:', error.message);
      }
    }
    console.log();

    // Example 9: Creating a new instance with different defaults
    console.log('🏭 Example 9: Custom Instance');
    const apiClient = client.create({
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
        'X-API-Version': 'v1'
      }
    });
    
    const apiResponse = await apiClient.get('https://httpbin.org/headers');
    console.log('API Client Status:', apiResponse.status);
    console.log('API Client Headers:', apiResponse.data.headers['X-Api-Version'], '\n');

    // Example 10: Timeout example
    console.log('⏱️  Example 10: Timeout Example');
    const quickClient = new HttpClient({ timeout: 1 }); // 1ms timeout
    try {
      await quickClient.get('https://httpbin.org/delay/2');
    } catch (error) {
      console.log('Timeout Error:', error.message, '\n');
    }

    console.log('✅ All examples completed successfully!');

  } catch (error) {
    console.error('❌ Error running examples:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples();
}

module.exports = runExamples;