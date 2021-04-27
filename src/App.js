import React from 'react';
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import MainFood from './Pages/MainFood';
import MainDrink from './Pages/MainDrink';
import Profile from './Pages/Profile';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';

function App() {
  return (
    <div className="meals">
      {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}

      <Switch>
        {/* <Route path="/receitas-favoritas" component={ FavoriteRecipes }/>
          <Route path="/receitas-feitas" component={ RecipesDone }/> */}
        <Route path="/perfil" component={ Profile } />
        {/* <Route path="/explorar/comidas/area" component={ ExploreFoodByArea }/>
          <Route path="/explorar/bebidas/ingredientes" component={ ExploreDrinkByIng }/>
          <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodByIng }/>
          <Route path="/explorar/bebidas" component={ ExploreDrink }/>
          <Route path="/explorar/comidas" component={ ExploreFood }/>
          <Route path="/explorar" component={ Explore }/>
          <Route path="/bebidas/{id-da-receita}/in-progress" render={ (drink-id) => <DrinkProgress {...drink-id} /> }/>
          <Route path="/comidas/{id-da-receita}/in-progress" render={ (recipe-id) => <FoodProgress {...recipe-id} /> } />
          <Route path="/bebidas:{id-bebida}" render={ (drink-id) => <DrinkDetails {...drink-id} /> } />
          <Route path="/comidas/:{id-receita}"
          render={ (recipe-id) => <FoodDetails {...recipe-id} /> }/> */}
        <Route path="/bebidas" component={ MainDrink } />
        <Route path="/comidas" component={ MainFood } />
        <Route exact path="/" component={ Login } />
      </Switch>

    </div>
  );
}

export default App;
