///<reference types="Cypress" />

describe('All pages load', () => {
  it('/', () => {
    cy.visitAsNewUser('/');
  });

  it('/data', () => {
    cy.visitAsNewUser('/data');
  });

  it('/about', () => {
    cy.visitAsNewUser('/about');
  });
});

describe('<h1> in Header navigates to /', () => {
  it('from /data', () => {
    cy.visitAsNewUser('/data');
    cy.get('h1').click();
    cy.url().should('include', '#/');
  });

  it('from /about', () => {
    cy.visitAsNewUser('/about');
    cy.get('h1').click();
    cy.location('hash').should('eq', '#/');
  });
});

describe('"Back to Matrix" btn navigates to /', () => {
  it('from /data', () => {
    cy.visitAsNewUser('/data');
    cy.get('header > button').click();
    cy.location('hash').should('eq', '#/');
  });

  it('from /about', () => {
    cy.visitAsNewUser('/about');
    cy.get('header > button').click();
    cy.location('hash').should('eq', '#/');
  });
});

describe('Links and buttons in footer of /', () => {
  beforeEach(() => {
    cy.visitAsNewUser('/');
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

describe('Jump links in /data', () => {
  context('User without previous ratings', () => {
    before(() => {
      cy.visitAsNewUser('/data');
    });

    it('Rating Frequencies', () => {
      cy.get('.nav__link').contains('Rating Frequencies').click();
      cy.location('hash').should('eq', '#/data/#frequencies');
    });

    it('Isolated Dimensions', () => {
      cy.get('.nav__link').contains('Isolated Dimensions').click();
      cy.location('hash').should('eq', '#/data/#iso-dimensions');
    });

    it('2D Histograms', () => {
      cy.get('.nav__link').contains('2D Histograms').click();
      cy.location('hash').should('eq', '#/data/#histograms');
    });

    it('Correlation Matrices', () => {
      cy.get('.nav__link').contains('Correlation Matrices').click();
      cy.location('hash').should('eq', '#/data/#correlation');
    });
  });

  context('User with previous ratings', () => {
    before(() => {
      cy.visitAsUserWithPreviousRatings('/data');
      cy.closeReturningUserModal();
    });

    it('Percentiles', () => {
      cy.get('.nav__link').contains('Percentiles').click();
      cy.location('hash').should('eq', '#/data/#percentiles');
    });
  });
});

describe('Links in returning user modal', () => {
  context('/', () => {
    beforeEach(() => {
      cy.visitAsUserWithPreviousRatings('/');
    });

    it('"Adjust My Ratings" closes modal', () => {
      cy.get('.modal__btn-group > button')
        .contains('Adjust my ratings')
        .click();
      cy.get('.react-responsive-modal-overlay').should('not.visible');
    });

    it('"Skip to the fancy charts" navigates to /data', () => {
      cy.get('.modal__btn-group > button')
        .contains('Skip to the fancy charts')
        .click();

      cy.location('hash').should('eq', '#/data');
    });
  });

  context('/data', () => {
    beforeEach(() => {
      cy.visitAsUserWithPreviousRatings('/data');
    });

    it('"Adjust my ratings" navigates to /', () => {
      cy.get('.modal__btn-group > button')
        .contains('Adjust my ratings')
        .click();

      cy.location('hash').should('eq', '#/');
    });

    it('"Skip to the fancy charts" closes modal', () => {
      cy.get('.modal__btn-group > button')
        .contains('Skip to the fancy charts')
        .click();
      cy.get('.react-responsive-modal-overlay').should('not.visible');
    });
  });

  context('/about', () => {
    beforeEach(() => {
      cy.visitAsUserWithPreviousRatings('/about');
    });

    it('"Adjust my ratings" navigates to /', () => {
      cy.get('.modal__btn-group > button')
        .contains('Adjust my ratings')
        .click();

      cy.location('hash').should('eq', '#/');
    });

    it('"Skip to the fancy charts" navigates to /data', () => {
      cy.get('.modal__btn-group > button')
        .contains('Skip to the fancy charts')
        .click();

      cy.location('hash').should('eq', '#/data');
    });
  });
});
