describe("User authenticates", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("Sucessfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      header: {
        uid: "user@mail.com",
      },
    });
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@email.com");
      cy.get("#password").type("password");
      cy.get("button").contains("Submit").click();
    });
    cy.get("#message").should("contain", "You're logged in as: user@mail.com");
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
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get("button").contains("Submit").click();
    });
    cy.get("#message").should(
      "contain",
      "Invalid login credentials. Please try again."
    );
  });
});
