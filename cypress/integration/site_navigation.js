///<reference types="Cypress" />

describe('All pages load', () => {
  it('/', () => {
    cy.visit('/');
  });

  it('/data', () => {
    cy.visit('/data');
  });

  it('/about', () => {
    cy.visit('/about');
  });
});

describe('"Back to Matrix" btn navigates to /', () => {
  it('from /data', () => {
    cy.visit('/data');
    cy.get('header > button').click();
    cy.url().should('include', '#/');
  });

  it('from /about', () => {
    cy.visit('/about');
    cy.get('header > button').click();
    cy.location('hash').should('eq', '#/');
  });
});

describe('Links and buttons in footer of /', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Has 3 elements', () => {
    cy.get('.bottom__link').should('have.length', 3);
  });

  it('"About" navigates to /about', () => {
    cy.get('.bottom__link').contains('About').click();
    cy.location('hash').should('eq', '#/about');
  });

  it('"Data" navigates to /data', () => {
    cy.get('.bottom__link').contains('Data').click();
    cy.location('hash').should('eq', '#/data');
  });

  it('"Inspiration" opens xkcd Modal', () => {
    cy.get('.bottom__link').contains('Inspiration').click();
    cy.get('.react-responsive-modal-overlay');
  });
});
