const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Load fixtures (equivalent to Cypress fixtures)
const loadFixture = (filename) => {
  const fixturePath = path.join(__dirname, `fixtures/${filename}.json`);
  return JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
};

// Custom login function (similar to Cypress custom commands)
const login = async (page, username, password) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
};

test.describe('Login Tests', () => {
  // Load user data before tests
  const usersData = loadFixture('users');

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Page should be visible', async ({ page }) => {
    await expect(page).toBeVisible();
  });

  test('Login with valid credentials', async ({ page }) => {
    const user = usersData.stn;
    await login(page, user.username, user.password);
    
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });

  test('Use incorrect login credentials', async ({ page }) => {
    const user = usersData.inv;
    await login(page, user.username, 'incorrectpassword');
    
    const errorButton = page.locator('.error-button');
    const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
    
    await expect(errorButton).toBeVisible();
    await expect(errorMessage).toBeVisible();
  });

  test('Locked Out User', async ({ page }) => {
    const user = usersData.lck;
    await login(page, user.username, user.password);
    
    const errorButton = page.locator('.error-button');
    const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
    
    await expect(errorButton).toBeVisible();
    await expect(errorMessage).toBeVisible();
  });
});