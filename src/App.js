import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import TelaPrincipal from './Pages/TelaPrincipal';
import Perfil from './Pages/Perfil';
import Detalhes from './Pages/Detalhes';
import EmProgresso from './Pages/EmProgresso';
import Explorar from './Pages/Explorar/Explorar';
import ExploreDrinks from './Pages/Explorar/ExploreDrinks';
import ExploreFoods from './Pages/Explorar/ExploreFoods';
import { MyContextProvider } from './MyContext';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Switch>
          <Route path="/comidas/:id/in-progress" component={ EmProgresso } />
          <Route path="/bebidas/:id/in-progress" component={ EmProgresso } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/comidas/:id" component={ Detalhes } />
          <Route path="/bebidas/:id" component={ Detalhes } />
          <Route path="/explorar" component={ Explorar } />
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
