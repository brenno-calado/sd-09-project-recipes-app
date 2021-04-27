import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from './context';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Layout>
  );
}
