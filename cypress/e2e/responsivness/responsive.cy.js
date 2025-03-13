describe('Screen tests', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    context('Desktop View', () => {
        it('should display the website layout correctly on desktop', () => {
            cy.viewport(1280, 720);
            cy.get('.login_logo').should('be.visible');
            cy.get('#user-name').should('be.visible');
            cy.get('#password').should('be.visible');
            cy.get('#login-button').should('be.visible');

        });
    });

    context('Tablet View', () => {
        it('should adapt the website design for tablet screen size', () => {
            cy.viewport('ipad-2');
            cy.get('.login_logo').should('be.visible');
            cy.get('#user-name').should('be.visible');
            cy.get('#password').should('be.visible');
            cy.get('#login-button').should('be.visible');
        });
    });


    context('Mobile View', () => {
        it('should display the website correctly on mobile devices and ensure all interactive elements are accessible', () => {
            cy.viewport('iphone-6');
            cy.get('.login_logo').should('be.visible');
            cy.get('#user-name').should('be.visible');
            cy.get('#password').should('be.visible');
            cy.get('#login-button').should('be.visible');
        });
    });
});