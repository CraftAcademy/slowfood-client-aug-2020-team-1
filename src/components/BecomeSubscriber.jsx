import React, { Component } from 'react'

class BecomeSubscriber extends Component {
  state = {
    renderForm: false
  }

  render() {
    return (
      <div>
        {
          this.state.renderForm ? (
            <form data-cy="payment-form">
              <input placeholder="Give me ur credit card info"/>
            </form>
          ) : (
            <button data-cy="become-subscriber" onClick={() => this.setState({ renderForm: true })}>
              Become subscriber
            </button>
          )
        }
        
      </div>
    )
  }
}

export default BecomeSubscriber
