import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import TelaPrincipal from './Pages/TelaPrincipal';
import Perfil from './Pages/Perfil';
import { MyContextProvider } from './MyContext';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Switch>
          <Route path="/comidas" component={ TelaPrincipal } />
          <Route path="/bebidas" component={ TelaPrincipal } />
          <Route path="/perfil" component={ Perfil } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </Router>
    </MyContextProvider>
  );
}

export default App;
