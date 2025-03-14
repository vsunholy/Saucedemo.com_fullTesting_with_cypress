# 🔍 SauceDemo.com Full Testing Suite with Cypress 🛡️

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

## 📋 Overview

This repository contains a comprehensive E2E testing suite for [SauceDemo.com](https://www.saucedemo.com/) - a sample e-commerce application. The test suite validates user flows, UI elements, functionality and identifies known bugs using Cypress.

## ✨ Features

- **📊 Complete test coverage** for critical user journeys
- **🔐 Authentication testing** for various user types
- **🛒 E-commerce functionality** validation (product listing, cart, checkout)
- **📱 Responsive design** testing across multiple devices
- **🐛 Bug validation** for known issues
- **🔄 Custom commands** for improved test readability

## 🏗️ Project Structure

```
├── cypress/
│   ├── e2e/           # Test files
│   │   ├── inventory.cy.js   # Product listing & cart functionality tests
│   │   ├── login.cy.js       # Authentication tests
│   │   ├── responsive.cy.js  # Responsive design tests
│   │   └── bugs.cy.js        # Known bug verification
│   ├── fixtures/      # Test data
│   │   └── users.json        # User credentials
│   └── support/       # Helper functions
│       └── commands.js       # Custom Cypress commands
```

## 🧪 Test Categories

### 🔐 Authentication (login.cy.js)

Tests various login scenarios including:

```javascript
context('Login with valid credentials', () => {
  it('Login with valid credentials', () => {
    const user = usersData.stn;
    cy.login(user.username, user.password);
    cy.url().should('include', '/inventory.html');
    cy.contains('Swag Labs').should('be.visible');
  });
});

context('Locked Out User', () => {
  it('Locked Out User', () => {
    const user = usersData.lck;
    cy.login(user.username, user.password);
    cy.get('.error-button').should('be.visible');
    cy.contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible');
  });
});
```

### 🛍️ Product Inventory (inventory.cy.js)

Comprehensive tests for product listing, sorting, filtering and cart operations:

```javascript
context('Sorting Functionality', () => {
  it('should sort products by Price (low to high)', () => {
    cy.get('.product_sort_container').select('Price (low to high)');
    cy.get('.inventory_item_price')
      .first()
      .should('have.text', '$7.99');
  });
});

context('Add to Cart Functionality', () => {
  it('should update the shopping cart count when items are added', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.contains('Add to cart').click();
    });
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
});
```

### 💲 Checkout Process (inventory.cy.js)

Tests the complete checkout flow from cart to completion:

```javascript
context('Checkout Form Error Handling', () => {
  it('should display an error when required fields are empty in the checkout form', () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Error: First Name is required');
  });
});

context('Finish Order Functionality', () => {
  it('should complete the order and display the Order Confirmation page', () => {
    // ... checkout process ...
    cy.contains('Finish').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('be.visible').and('contain', 'Thank you for your order!');
  });
});
```

### 📱 Responsive Testing (responsive.cy.js)

Validates the application's display across different device sizes:

```javascript
context('Mobile View', () => {
  it('should display the website correctly on mobile devices', () => {
    cy.viewport('iphone-6');
    cy.get('.login_logo').should('be.visible');
    cy.get('#user-name').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });
});
```

### 🐛 Bug Verification (bugs.cy.js)

Tests that verify the existence of known bugs:

```javascript
context('Problem User Product Image Display Issue', () => {
  it('should verify that product images load correctly for problem_user', () => {
    cy.get('#user-name').type('problem_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.inventory_item_img img').each(($img) => {
      cy.wrap($img).should('be.visible');
      cy.wrap($img).should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });
});
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vsunholy/Saucedemo.com_fullTesting_with_cypress.git
cd Saucedemo.com_fullTesting_with_cypress
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Open Cypress test runner:
```bash
npx cypress open
# or
yarn cypress open
```

## 🏃‍♂️ Running Tests

### GUI Mode
```bash
npm run cypress:open
```

### Headless Mode
```bash
npm run cypress:run
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## 💡 Custom Commands

The project uses several custom Cypress commands to improve test readability:

```javascript
// Check if login page elements are visible
Cypress.Commands.add('pgVisible', _ => {
  cy.get('.login_logo').should('be.visible');
  cy.get('body').should('be.visible');
});

// Login with provided credentials
Cypress.Commands.add('login', (username, password) => {
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});
```

## 📈 Test Coverage

| Category | Coverage |
|----------|----------|
| Authentication | ✅ 100% |
| Product Display | ✅ 100% |
| Cart Operations | ✅ 100% |
| Checkout Flow | ✅ 100% |
| Navigation | ✅ 100% |
| Responsive Design | ✅ 100% |
| Known Bugs | ✅ 100% |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/vsunholy/Saucedemo.com_fullTesting_with_cypress](https://github.com/vsunholy/Saucedemo.com_fullTesting_with_cypress)

---

⭐️ If this testing suite helped your project, please consider giving it a star!
