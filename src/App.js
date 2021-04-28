import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterMenu from './components/FooterMenu';
import Login from './Pages/Login';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Explore from './Pages/Explore';

function App() {
  return (
    <>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Foods } />
          <Route path="/bebidas" component={ Drinks } />
          <Route path="/explorar" component={ Explore } />
        </Switch>
      </div>
      <FooterMenu />
    </>
  );
}

export default App;
