import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import history from './helper/history';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


// optional configuration
const options = {
  position: positions.TOP_RIGHT,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </Router>
  , document.getElementById('root')
);

reportWebVitals();
