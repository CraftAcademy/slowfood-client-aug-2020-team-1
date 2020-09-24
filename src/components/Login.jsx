import React, { Component } from 'react'
import { signIn } from '../modules/authentication'
import LoginForm from './LoginForm'


class Login extends Component {
  state = {
    renderLoginForm: false
  }

  login = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    const authResponse = await signIn(email, password)

    if (authResponse.authenticated) {
      this.props.authenticated()
    } else {
      this.props.renderLoginError(authResponse.data)
    }
  }

  render() {
    
    return (
      <>
      {
        this.state.renderLoginForm ? (
          <LoginForm 
            login={this.login}
          />
        ) : (
          <button onClick={() => this.setState({renderLoginForm: true})} data-cy="toggle-login">Login</button>
        )
      }
      </>
    )
  }
}

export default Login
