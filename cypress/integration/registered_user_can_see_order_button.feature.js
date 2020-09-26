describe("Display list of products", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
    });
    cy.visit("/");
  });

  it("if authenticate sucesfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="button"]').contains("Submit").click();
    });
    cy.get('[data-cy="message"]').should("contain", "Hi user@mail.com");
    cy.get('[data-cy="product-1"]').within(() => {
      cy.get('[data-cy="button"]').contains("Add to order");
    });
  });

  it("with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false,
      },
    });
    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("wrongpassword");
      cy.get('[data-cy="button"]').contains("Submit").click();
    });
    cy.get('[data-cy="message"]').should(
      "contain",
      "Invalid login credentials. Please try again."
    );
    cy.get('[data-cy="product-1"]').within(() => {
      cy.get('[data-cy="button"]').should("not.exist");
    });
  });
});

