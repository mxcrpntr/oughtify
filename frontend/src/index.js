import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { createRoot } from 'react-dom/client';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import signUpErrors from './components/SignupFormPage/signUpErrors';

const store = configureStore();
window.signUpErrors = signUpErrors;

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const root = createRoot(document.getElementById('root'))


const renderApplication = () => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication());
} else {
  renderApplication();
}

