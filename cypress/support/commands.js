// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('visitAsNewUser', (path) => {
  cy.server();
  cy.route({
    method: 'GET',
    url: 'https://localhost:3000/previous-ratings',
    status: 204,
  });
  cy.visit(path);
});

Cypress.Commands.add('visitAsUserWithPreviousRatings', (path) => {
  cy.route2('http://localhost:3000/previous-ratings', {
    fixture: 'previous_ratings_of_three_fruits.json',
  });
  cy.visit(path);
});

Cypress.Commands.add('closeReturningUserModal', () => {
  cy.get('.react-responsive-modal-closeButton').click();
});
