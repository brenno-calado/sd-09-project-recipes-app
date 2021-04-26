import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Explore from './pages/Explore';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';

function App() {
  return (
    <div className="meals">
      <Route path="/" component={ Login } />
      <Route path="/explorar/comidas" component={ Foods } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/bebidas" component={ Drinks } />
    </div>
  );
}

export default App;
