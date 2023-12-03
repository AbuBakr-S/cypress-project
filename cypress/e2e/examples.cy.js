describe('Various examples', () => {
  beforeEach(() => cy.visit('/examples'));
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
  it('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
      /* 
        ? fixture here is a file that we want to return as our response.
        ? cypress creates /fixtures/example.json for us by default
        ? use this to return mocked data or provide a literal body.message object
      */  
      fixture: 'example.json'
    });
    cy.getDataTest('post-btn').click();
  });
  it.only('grudges', () => {
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });
    // clear button should not exists when no grudges have been set
    cy.getDataTest('clear-btn').should('not.exist');
    // check title
    cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges');
    cy.contains(/add some grudges/i);
    // look for a nested input element
    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('Smoking');
    });
    cy.getDataTest('add-grudge-btn').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });
    // recheck title has updated after adding a grudge
    cy.getDataTest('grudge-list-title').should('have.text', 'Grudges');
    // add another grudge
    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('Cyclists on the road');
    });
    cy.getDataTest('add-grudge-btn').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2);
      // cy.get('li') returns an array
      cy.get('li').its(0).should('contains.text', 'Smoking');
    });
    // remove a grudge
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').its(0).within(() => {
        cy.get('button').click();
      });
      cy.get('li').should('have.length', 1);
    });
    // look for the clear button implicitly
    cy.getDataTest('clear-btn').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    })
  })
})