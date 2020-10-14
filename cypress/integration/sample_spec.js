describe('My First Test', () => {
  it('Visits Fruit Matrix', () => {
    cy.visit('http://localhost:3000/#/');

    cy.get('.bottom__link');
  });
});
