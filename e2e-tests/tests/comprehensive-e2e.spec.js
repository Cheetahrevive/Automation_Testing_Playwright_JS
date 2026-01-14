// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Comprehensive End-to-End Test Suite
 * Tests critical user flows in end-to-end scenarios
 */

test.describe('Complete User Journey Tests', () => {
  
  test('E2E: Multi-step user workflow', async ({ page }) => {
    // Navigate to demo application
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Step 1: Add multiple items
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('Buy groceries');
    await newTodo.press('Enter');
    await newTodo.fill('Pay bills');
    await newTodo.press('Enter');
    await newTodo.fill('Read book');
    await newTodo.press('Enter');
    
    // Step 2: Verify items were added
    await expect(page.getByTestId('todo-title')).toHaveCount(3);
    
    // Step 3: Mark first item as complete
    const firstTodo = page.getByTestId('todo-item').first();
    await firstTodo.getByRole('checkbox').check();
    await expect(firstTodo).toHaveClass(/completed/);
    
    // Step 4: Filter active items
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    
    // Step 5: Return to all and verify
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });
  
  test('E2E: Edit and delete workflow', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add item
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('Original task');
    await newTodo.press('Enter');
    
    // Edit item
    await page.getByTestId('todo-item').dblclick();
    const editInput = page.getByTestId('text-input');
    await editInput.fill('Updated task');
    await editInput.press('Enter');
    
    // Verify update
    await expect(page.getByTestId('todo-title')).toContainText('Updated task');
  });
});
