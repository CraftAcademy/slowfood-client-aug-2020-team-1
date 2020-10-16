import React, { Component } from 'react'
import {
  injectStripe,
  CardExpiryElement,
  CardCVCElement,
  CardNumberElement
} from "react-stripe-elements";
import axios from 'axios'

class BecomeSubscriber extends Component {
  state = {
    renderForm: false,
    message: null
  }

  payWithStripe = async (event) => {
    event.preventDefault()

    let stripeReponse = await this.props.stripe.createToken()

    stripeReponse.token && (
      this.performPayment(stripeReponse.token.id)
    )
  }

  performPayment = async (stripeToken) => {
    let headers = sessionStorage.getItem("credentials")
    headers = JSON.parse(headers)
    headers = {
      ...headers,
      "Content-type": "application/json",
      Accept: "application/json"
    }

    let response = await axios.post("/subscriptions", {
      stripeToken: stripeToken
    }, {
      headers: headers
    })

    if (response.data.paid) {
      this.setState({ message: response.data.message })
    }
  }

  render() {

    return (
      <div>
        { this.state.message ? (
          <p data-cy="payment-message" >{this.state.message}</p>
        ) : (
            <>
              { this.state.renderForm ? (
                <form data-cy="payment-form" onSubmit={this.payWithStripe}>
                  <div id="card-number">
                    <label>Card Number</label>
                    <CardNumberElement />
                  </div>

                  <div id="card-expiry">

                    <label>Card Expiry</label>
                    <CardExpiryElement />
                  </div>

                  <div id="card-cvc">
                    <label>Card CVC</label>
                    <CardCVCElement />
                  </div>

                  <button>Submit payment</button>
                </form>
              ) : (
                  <button data-cy="become-subscriber" onClick={() => this.setState({ renderForm: true })}>
                    Become subscriber
                  </button>
                )
              }
            </>
          )
        }
      </div>

    )
  }
}

export default injectStripe(BecomeSubscriber)