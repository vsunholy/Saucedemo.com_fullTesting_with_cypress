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
        it.only('should display detailed product information when a product is clicked', () => {
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





























});