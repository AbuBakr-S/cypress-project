describe('Various examples', () => {
  beforeEach(() => cy.visit('/'));
  it('multi-page testing', () => {
    cy.getDataTest('nav-overview').click();
    cy.location('pathname').should("equal", "/overview");

    cy.getDataTest('nav-fundamentals').click();
    cy.location('pathname').should("equal", "/fundamentals");

    cy.getDataTest('nav-forms').click();
    cy.location('pathname').should("equal", "/forms");

    cy.getDataTest('nav-examples').click();
    cy.location('pathname').should("equal", "/examples");

    cy.getDataTest('nav-component').click();
    cy.location('pathname').should("equal", "/component");

    cy.getDataTest('nav-best-practices').click();
    cy.location('pathname').should("equal", "/best-practices");
  });
  it.only('intercepts', () => {
    cy.getDataTest('nav-examples').click();
    cy.intercept('POST', 'http://localhost:3000/examples', {
      /* 
        ? fixture here is a file that we want to return as our response.
        ? cypress creates /fixtures/example.json for us by default
        ? use this to return mocked data or provide a literal body.message object
      */  
      fixture: 'example.json'
    });
    cy.getDataTest('post-btn').click();
  })
})