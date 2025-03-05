// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('pgVisible' , _ =>{
    cy.get('.login_logo').should('be.visible');
    cy.get('body').should('be.visible');
})

Cypress.Commands.add('login' , (username, password) => {
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
}
)