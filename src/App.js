import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ pages.Login } />
        <Route path="/comidas" component={ pages.Foods } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
