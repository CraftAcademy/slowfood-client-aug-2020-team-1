describe("Display list of products", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: "fixture:orders.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.visit("/");

    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="button"]').contains("Submit").click();
    });
  });
  it("successfully", () => {
    cy.get("[data-cy=product-1]").within(() => {
      cy.get("[data-cy=button]").contains("Add to order").click();
    });
    cy.contains("item has been added to your order");
  });
});
