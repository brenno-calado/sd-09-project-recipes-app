import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ pages.Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
