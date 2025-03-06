describe('Inventory tests', () => {

  let usersData;

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.fixture('users').then((data) => {
      usersData = data;

    });
  });

  context('Displaying the Products List', () => {
    it('Login with valid credentials', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);;
      cy.url().should('include', '/inventory.html');
      cy.contains('Swag Labs').should('be.visible');
      cy.get('.inventory_item').each(($item) => {
        cy.wrap($item).find('.inventory_item_img').should('be.visible');
        cy.wrap($item).find('.inventory_item_name').should('be.visible');
        cy.wrap($item).find('.inventory_item_desc').should('be.visible');
        cy.wrap($item).find('.inventory_item_price').should('be.visible');
      })
    });
  });



  context('Add to Cart Functionality', () => {
    it('should update the shopping cart count when items are added', () => {
      const user = usersData.stn;

      cy.login(user.username, user.password);

      cy.url().should('include', '/inventory.html');

      cy.get('.inventory_item').first().within(() => {
        cy.contains('Add to cart').click();
      });

      cy.get('.shopping_cart_badge').should('have.text', '1');

      cy.get('.inventory_item').eq(1).within(() => {
        cy.contains('Add to cart').click();
      });

      cy.get('.shopping_cart_badge').should('have.text', '2');
    });
  });


  context('Sorting Functionality', () => {

    beforeEach(() => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
    });

    it('should sort products by Name (A to Z)', () => {
      cy.get('.product_sort_container').select('Name (A to Z)');
      cy.get('.inventory_item_name')
        .first()
        .should('have.text', 'Sauce Labs Backpack');
    });

    it('should sort products by Name (Z to A)', () => {
      cy.get('.product_sort_container').select('Name (Z to A)');
      cy.get('.inventory_item_name')
        .first()
        .should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    });

    it('should sort products by Price (low to high)', () => {
      cy.get('.product_sort_container').select('Price (low to high)');
      cy.get('.inventory_item_price')
        .first()
        .should('have.text', '$7.99');
    });

    it('should sort products by Price (high to low)', () => {
      cy.get('.product_sort_container').select('Price (high to low)');
      cy.get('.inventory_item_price')
        .first()
        .should('have.text', '$49.99');
    });
  });

  context('Viewing Product Details', () => {
    it('should display detailed product information when a product is clicked', () => {
      const user = usersData.stn;

      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item_name').first().click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('.inventory_details_img').should('be.visible');
      cy.get('.inventory_details_name').should('be.visible');
      cy.get('.inventory_details_desc').should('be.visible');
      cy.get('.inventory_details_price').should('be.visible');
    });
  });

  context('Add/Remove Product from Cart', () => {
    it('should allow adding and removing a product from the cart', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item_name').first().click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('button').contains('Add to cart').click();
      cy.get('button').contains('Remove').should('be.visible');
      cy.get('button').contains('Remove').click();
      cy.get('button').contains('Add to cart').should('be.visible');
    });
  });

  context('Returning to the Inventory Page', () => {
    it('should navigate back to the inventory page from product details', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item_name').first().click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('include', '/inventory.html');
    });
  });

  context('Displaying Items in the Cart', () => {
    it('should display all added products in the cart', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').first().within(() => {
        cy.contains('Add to cart').click();
      });
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').should('have.length.greaterThan', 0);
    });
  });


  context('Removing Items from the Cart', () => {
    it('should remove the selected product from the cart and update the cart list', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').first().within(() => {
        cy.contains('Add to cart').click();
      });
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').should('have.length.greaterThan', 0);
      cy.get('.cart_item').first().within(() => {
        cy.contains('Remove').click();
      });
      cy.get('.cart_item').should('have.length', 0);
    });
  });
  
  context('Checkout Button Functionality', () => {
    it('should redirect to the first step of the checkout process when the Checkout button is clicked', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').first().within(() => {
        cy.contains('Add to cart').click();
      });
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').should('have.length.greaterThan', 0);
      cy.contains('Checkout').click();
      cy.url().should('include', '/checkout-step-one.html');
    });
  });
  






















});