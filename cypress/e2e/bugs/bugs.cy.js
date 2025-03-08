describe('Bugs', () => {
    


    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
  
    });


    context('Problem User Product Image Display Issue', () => {
        it('should verify that product images load correctly for problem_user', () => {
        
         
          cy.get('#user-name').type('problem_user');
          cy.get('#password').type('secret_sauce');
          cy.get('#login-button').click();
          cy.url().should('include', '/inventory.html');
          cy.get('.inventory_item_img img').each(($img) => {
            cy.wrap($img).should('be.visible');
            cy.wrap($img).should(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
          });
        });
      });
      


      context('Performance Glitch User - Slow Page Load', () => {
        it('should exhibit a slower page load time when logging in with performance_glitch_user', () => {
          const threshold = 2000; 
          const startTime = Date.now();
          cy.visit('https://www.saucedemo.com/');
          cy.get('#user-name').type('performance_glitch_user');
          cy.get('#password').type('secret_sauce');
          cy.get('#login-button').click();
          cy.url().should('include', '/inventory.html').then(() => {
            const endTime = Date.now();
            const loadTime = endTime - startTime;
            cy.log(`Page load time: ${loadTime} ms`);
            expect(loadTime).to.be.greaterThan(threshold);
          });
        });
      });
      
   






















});