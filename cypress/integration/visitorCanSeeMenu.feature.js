describe("User can see menu", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products_index.json",
    });

    cy.visit("/");
  });

  it("shows first item", () => {
    cy.get("[data-cy=product-1]").within(() => {
      cy.contains("Pizza");
      cy.contains("55");
    });
  });

  it("shows second item", () => {
    cy.get("[data-cy=product-2]").within(() => {
      cy.contains("Cheeseburger");
      cy.contains("70");
    });
  });
});