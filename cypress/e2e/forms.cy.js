describe('Form tests', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });
  it('Test subscribe form', () => {
    // * Happy path
    cy.contains(/Testing Forms/i);
    cy.contains(/Successfully subbed: abz\.siddique@gmail\.com!/i).should('not.exist');
    // create an alias
    cy.getDataTest('subscribe-form').find('input').as('subscribe-input');
    cy.get('@subscribe-input').type('abz.siddique@gmail.com');
    cy.getDataTest('subscribe-btn').click()
    cy.contains(/Successfully subbed: abz\.siddique@gmail\.com!/i).should('exist');
    cy.wait(3000);
    cy.contains(/Successfully subbed: abz\.siddique@gmail\.com!/i).should('not.exist');
    
    // * Sad path
    cy.get('@subscribe-input').type('abz.siddique@gmail.io');
    cy.contains(/Invalid email: abz\.siddique@gmail\.io!/i).should('not.exist');
    cy.getDataTest('subscribe-btn').click();
    cy.contains(/Invalid email: abz\.siddique@gmail\.io!/i).should('exist');
    cy.wait(3000);
    cy.contains(/Invalid email: abz\.siddique@gmail\.io!/i).should('not.exist');
    
    // Click submit on an empty input - button value clears after 3sec
    cy.contains(/fail!/i).should('not.exist');
    cy.getDataTest('subscribe-btn').click();
    cy.contains(/fail!/i).should('exist');
    cy.wait(3000);
    cy.contains(/fail!/i).should('not.exist');
  })
})