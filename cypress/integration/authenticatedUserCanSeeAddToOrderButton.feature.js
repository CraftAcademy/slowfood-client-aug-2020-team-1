describe("User can see add to order button", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products_index.json",
    });

    cy.visit("/");
  });

  it("if authenticated successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:successfull_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });

    cy.get("[data-cy=toggle-login]").click();
    cy.get("[data-cy=login-form]").within(() => {
      cy.get("[data-cy=login-email]").type("user@mail.com");
      cy.get("[data-cy=login-password]").type("password");
      cy.get("[data-cy=login-submit]").contains("Submit").click();
    });
    cy.get("[data-cy=message]").should("contain", "Hi user@mail.com");

    cy.get("[data-cy=product-1]").within(() => {
      cy.get('button').contains("Add to order");
    });
  });

  it("unsuccessfully if authentication failed", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      },
    });
    cy.get("[data-cy=toggle-login]").click();
    cy.get("[data-cy=login-form]").within(() => {
      cy.get("[data-cy=login-email]").type("user@mail.com");
      cy.get("[data-cy=login-password]").type("wrong_password");
      cy.get("[data-cy=login-submit]").contains("Submit").click();
    });

    cy.get("[data-cy=message]").should(
      "contain",
      "Invalid login credentials. Please try again."
    );

    cy.get("[data-cy=product-1]").within(() => {
      cy.get('button').should("not.exist");
    });
  });
});