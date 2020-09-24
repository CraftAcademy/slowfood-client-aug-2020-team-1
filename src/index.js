import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
