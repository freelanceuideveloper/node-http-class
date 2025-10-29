const HttpClient = require('../index');

async function apiExample() {
  console.log('🌐 Real API Integration Example\n');

  // Create a client for JSONPlaceholder API
  const apiClient = new HttpClient({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Node-HTTP-Class-API-Example/1.0.0'
    }
  });

  try {
    // 1. Fetch all users
    console.log('👥 Fetching all users...');
    const usersResponse = await apiClient.get('https://jsonplaceholder.typicode.com/users');
    console.log(`Found ${usersResponse.data.length} users`);
    console.log('First user:', usersResponse.data[0].name, '\n');

    // 2. Fetch posts for a specific user
    const userId = 1;
    console.log(`📝 Fetching posts for user ${userId}...`);
    const postsResponse = await apiClient.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    console.log(`User ${userId} has ${postsResponse.data.length} posts`);
    console.log('Latest post:', postsResponse.data[0].title, '\n');

    // 3. Create a new post
    console.log('✍️  Creating a new post...');
    const newPost = {
      title: 'My Amazing Post',
      body: 'This is a post created using the Node HTTP Class package. It demonstrates how easy it is to make API calls!',
      userId: 1
    };
    
    const createResponse = await apiClient.post('https://jsonplaceholder.typicode.com/posts', newPost);
    console.log('✅ Post created with ID:', createResponse.data.id);
    console.log('Created post title:', createResponse.data.title, '\n');

    // 4. Update the post
    console.log('📝 Updating the post...');
    const updatedPost = {
      ...createResponse.data,
      title: 'My Updated Amazing Post',
      body: 'This post has been updated to show how PUT requests work!'
    };
    
    const updateResponse = await apiClient.put(`https://jsonplaceholder.typicode.com/posts/${createResponse.data.id}`, updatedPost);
    console.log('✅ Post updated successfully');
    console.log('Updated title:', updateResponse.data.title, '\n');

    // 5. Partially update with PATCH
    console.log('🔧 Partially updating the post...');
    const partialUpdate = {
      title: 'Partially Updated Title via PATCH'
    };
    
    const patchResponse = await apiClient.patch(`https://jsonplaceholder.typicode.com/posts/${createResponse.data.id}`, partialUpdate);
    console.log('✅ Post partially updated');
    console.log('New title:', patchResponse.data.title, '\n');

    // 6. Fetch comments for the post
    console.log('💬 Fetching comments for the post...');
    const commentsResponse = await apiClient.get(`https://jsonplaceholder.typicode.com/posts/${createResponse.data.id}/comments`);
    console.log(`Post has ${commentsResponse.data.length} comments`);
    if (commentsResponse.data.length > 0) {
      console.log('First comment by:', commentsResponse.data[0].email);
    }
    console.log();

    // 7. Delete the post
    console.log('🗑️  Deleting the post...');
    const deleteResponse = await apiClient.delete(`https://jsonplaceholder.typicode.com/posts/${createResponse.data.id}`);
    console.log('✅ Post deleted successfully (Status:', deleteResponse.status + ')\n');

    // 8. Demonstrate error handling with non-existent resource
    console.log('🚫 Demonstrating error handling...');
    try {
      await apiClient.get('https://jsonplaceholder.typicode.com/posts/9999999');
    } catch (error) {
      console.log('Expected error caught:', error.response.status, error.message, '\n');
    }

    console.log('🎉 API example completed successfully!');

  } catch (error) {
    console.error('❌ API Example failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Function to demonstrate different API patterns
async function advancedApiPatterns() {
  console.log('\n🔥 Advanced API Patterns\n');

  const client = new HttpClient();

  try {
    // 1. Concurrent requests
    console.log('⚡ Making concurrent requests...');
    const concurrentRequests = [
      client.get('https://jsonplaceholder.typicode.com/posts/1'),
      client.get('https://jsonplaceholder.typicode.com/posts/2'),
      client.get('https://jsonplaceholder.typicode.com/posts/3')
    ];

    const results = await Promise.all(concurrentRequests);
    console.log(`✅ Completed ${results.length} concurrent requests`);
    results.forEach((result, index) => {
      console.log(`Post ${index + 1}: ${result.data.title}`);
    });
    console.log();

    // 2. Sequential requests with dependency
    console.log('🔗 Sequential dependent requests...');
    
    // First, get a user
    const userResponse = await client.get('https://jsonplaceholder.typicode.com/users/1');
    console.log('👤 Fetched user:', userResponse.data.name);
    
    // Then, get their posts
    const userPostsResponse = await client.get(`https://jsonplaceholder.typicode.com/posts?userId=${userResponse.data.id}`);
    console.log(`📚 Found ${userPostsResponse.data.length} posts by ${userResponse.data.name}`);
    
    // Finally, get comments for the first post
    if (userPostsResponse.data.length > 0) {
      const firstPostId = userPostsResponse.data[0].id;
      const commentsResponse = await client.get(`https://jsonplaceholder.typicode.com/posts/${firstPostId}/comments`);
      console.log(`💬 First post has ${commentsResponse.data.length} comments\n`);
    }

    // 3. Custom authentication header
    console.log('🔐 Request with authentication...');
    const authClient = client.create({
      headers: {
        'Authorization': 'Bearer fake-jwt-token-here',
        'X-Client-Version': '1.0.0'
      }
    });

    const authResponse = await authClient.get('https://httpbin.org/bearer', {
      headers: {
        'Authorization': 'Bearer test-token-123'
      }
    });
    console.log('✅ Authenticated request successful');
    console.log('Token verified:', authResponse.data.authenticated, '\n');

    console.log('✨ Advanced patterns completed!');

  } catch (error) {
    console.error('❌ Advanced patterns failed:', error.message);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  (async () => {
    await apiExample();
    await advancedApiPatterns();
  })();
}

module.exports = { apiExample, advancedApiPatterns };