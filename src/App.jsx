import React, { Component } from "react";
import ProductsList from "./components/ProductsList";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";

class App extends Component {
  state = {
    renderLoginform: false,
    authenticated: false,
    message: "",
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              data-cy="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p data-cy="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p data-cy="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
      default:
        break;
    }

    return (
      <>
        {renderLogin}
        <NavBar />
        <ProductsList authenticated={this.state.authenticated} />
      </>
    );
  }
}
export default App;
