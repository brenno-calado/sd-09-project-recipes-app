import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from './pages';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ pages.Login } />
          <Route path="/comidas" component={ pages.Foods } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
