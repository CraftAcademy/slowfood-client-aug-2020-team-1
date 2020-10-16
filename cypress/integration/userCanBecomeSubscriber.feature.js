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

      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/subscriptions",
        response: "fixture:payment_response.json"
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

      // cy.get("[data-cy=payment-form]").should("exist")
      cy.wait(1000)

      cy.get("#card-number").within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find('input[name="cardnumber"]')
            .type("4242424242424242", { delay: 50 });
        });
      })

      cy.get("#card-expiry").within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find('input[name="exp-date"]').type("1222", { delay: 10 });
        });
      })

      cy.get("#card-cvc").within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find('input[name="cvc"]').type("999", { delay: 10 });
        });
      })

      cy.get("button").contains("Submit payment").click()

      cy.get("[data-cy=payment-message]").contains("Payment successfull")
    });
  })
})
