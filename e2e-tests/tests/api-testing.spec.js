// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * API Testing Suite
 * Tests API endpoints using Playwright's request context
 */

test.describe('API Testing - JSONPlaceholder', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('GET request - Fetch all posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    
    // Verify status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // Verify response data
    const posts = await response.json();
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('userId');
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
  });

  test('GET request - Fetch single post', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${BASE_URL}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post.title).toBeTruthy();
  });

  test('POST request - Create new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1
    };
    
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost).toMatchObject(newPost);
    expect(createdPost.id).toBeDefined();
  });

  test('PUT request - Update post', async ({ request }) => {
    const postId = 1;
    const updatedData = {
      id: postId,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };
    
    const response = await request.put(`${BASE_URL}/posts/${postId}`, {
      data: updatedData
    });
    
    expect(response.status()).toBe(200);
    
    const updatedPost = await response.json();
    expect(updatedPost.title).toBe(updatedData.title);
  });

  test('DELETE request - Remove post', async ({ request }) => {
    const postId = 1;
    const response = await request.delete(`${BASE_URL}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
  });

  test('Error handling - 404 Not Found', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/999999`);
    
    expect(response.status()).toBe(404);
  });
});

test.describe('API Testing - Response Headers and Performance', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('Verify response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('API response time is acceptable', async ({ request }) => {
    const startTime = Date.now();
    await request.get(`${BASE_URL}/posts`);
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(3000); // Should respond within 3 seconds
  });
});
