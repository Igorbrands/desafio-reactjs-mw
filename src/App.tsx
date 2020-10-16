import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </Provider>
);

export default App;
