describe('User can become subscriber', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/products",
        response: "fixture:products_index.json",
      });

      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth/sign_in",
        response: "fixture:successfull_login.json",
        headers: {
          uid: "user@mail.com",
        },
      });

      cy.visit("/");

      cy.get("[data-cy=toggle-login]").click();
      cy.get("[data-cy=login-form]").within(() => {
        cy.get("[data-cy=login-email]").type("user@mail.com");
        cy.get("[data-cy=login-password]").type("password");
        cy.get("[data-cy=login-submit]").contains("Submit").click();
      });
    })

    it('by filling in valid credit card information', () => {
      cy.get("[data-cy=become-subscriber]").click()

      cy.get("[data-cy=payment-form]").should("exist")
    });
  })
})
