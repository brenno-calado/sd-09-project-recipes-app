import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <BrowserRouter>
        <Switch>
          <Route path="/comidas"/>
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
