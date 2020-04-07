import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import './index.css';
import App from './App';
import axios from './axios';
// import registerServiceWorker from './registerServiceWorker';
import store, {history} from './store/configureStore';

axios.interceptors.request.use(config => {
  try {
    config.headers['Token'] = store.getState().users.user.token;
  } catch (e) {
    // do nothing
  }

  return config;
});

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();
