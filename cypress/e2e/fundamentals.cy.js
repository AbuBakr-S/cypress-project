describe("Fundamentals test", () => {
  beforeEach(() => cy.visit("/fundamentals"));
  it("Contains correct header text", () => {  
    cy.get('[data-test="fundamentals-header"]').should(
      "contain.text",
      "Testing Fundamentals"
    );
  }),
    it("Accordian works correctly", () => {
      cy.contains(/Your tests will exist in a describe block\./i).should(
        "not.be.visible"
      );
      cy.get('[data-test="accordian-item-1"] div[role="button"]').click();
      cy.contains(/Your tests will exist in a describe block\./i).should(
        "be.visible"
      );
      cy.get('[data-test="accordian-item-1"] div[role="button"]').click();
      cy.contains(/Your tests will exist in a describe block\./i).should(
        "not.be.visible"
      );
    });
});
