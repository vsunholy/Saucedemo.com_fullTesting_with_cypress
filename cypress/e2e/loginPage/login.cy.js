///<reference types="cypress" />



describe('Login Tests', () => {
  let usersData;

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.fixture('users').then((data) => {
      usersData = data;

    });
  });
  context('Login with valid credentials', () => {
    it('Page should be visible', () => {
      cy.pgVisible();
    });

    it('Login with valid credentials', () => {
      const user = usersData.stn;
      cy.login(user.username, user.password);
      cy.url().should('include', '/inventory.html');
      cy.contains('Swag Labs').should('be.visible');
    });
  });


  context('Use incorrect login credentials', () => {
    it('Page should be visible', () => {
      cy.pgVisible();
    });
    it('Use incorrect login credentials', () => {
      const user = usersData.inv;
      cy.login(user.username, 'incorrectpassword');
      cy.get('.error-button').should('be.visible');
      cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible');
    });
  })


  context('Locked Out User', () => {
    it('Page should be visible', () => {
      cy.pgVisible();
    });
    it('Locked Out User', () => {
      const user = usersData.lck;
      cy.login(user.username, user.password);
      cy.get('.error-button').should('be.visible');
      cy.contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible');
    });
  });
});
