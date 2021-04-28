import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Perfil from './Pages/Perfil';
import { MyContextProvider } from './MyContext';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/perfil" component={ Perfil } />
        </Switch>
      </Router>
    </MyContextProvider>
  );
}

export default App;
