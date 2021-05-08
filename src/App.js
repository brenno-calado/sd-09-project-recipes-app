import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import TelaPrincipal from './Pages/TelaPrincipal';
import Perfil from './Pages/Perfil';
import Detalhes from './Pages/Detalhes';
import TelaFavoritos from './Pages/TelaFavoritos';
import EmProgresso from './Pages/EmProgresso';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import Explorar from './Pages/Explorar/Explorar';
import ExploreDrinks from './Pages/Explorar/ExploreDrinks';
import ExploreFoods from './Pages/Explorar/ExploreFoods';
import IngredientsDrinks from './Pages/Explorar/IngredientsDrinks';
import IngredientsFoods from './Pages/Explorar/IngredientsFoods';
import DrinksDetails from './Pages/Explorar/DrinksDetails';
import FoodsDetails from './Pages/Explorar/FoodDetails';
import { MyContextProvider } from './MyContext';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Switch>
          <Route path="/comidas/:id/in-progress" component={ EmProgresso } />
          <Route path="/bebidas/:id/in-progress" component={ EmProgresso } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ IngredientsFoods }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ IngredientsDrinks }
          />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/comidas/:id" component={ Detalhes } />
          <Route path="/bebidas/:id" component={ Detalhes } />
          <Route path="/comidas/:id" component={ FoodsDetails } />
          <Route path="/bebidas/:id" component={ DrinksDetails } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/receitas-favoritas" component={ TelaFavoritos } />
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
