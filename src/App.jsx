import React, { Component } from 'react'
import Menu from "./components/Menu";
import Login from "./components/Login";

class App extends Component {
  state = {
    authenticated: false,
    authError: undefined
  }

  render() {
    let message;

    this.state.authenticated && (
      message = <p data-cy="message" >Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p> 
    )
    
    this.state.authError && (
      message = <p data-cy="message">{this.state.authError}</p>
    )

    return (
      <>
        { this.state.authenticated == false &&
          <Login
            authenticated={() => this.setState({ authError: undefined, authenticated: true })}
            renderLoginError={(authResponse) => this.setState({ authError: authResponse })}
          />
        }
        {message}
        <h1>Slowfood</h1>
        <Menu 
          authenticted={this.state.authenticated}
        />
      </>
    )
  }
}

export default App;
