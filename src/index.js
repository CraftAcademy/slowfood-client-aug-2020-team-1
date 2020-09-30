import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import * as serviceWorker from './serviceWorker';
import { StripeProvider } from 'react-stripe-elements'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

ReactDOM.render(
  <StripeProvider apiKey="pk_test_21nBNjeqdyB1Mzm2VjDPQprF00kyEKYZSK">
    <App />
  </StripeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
