import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Meals,
  Cocktails,
  Details,
  Explore,
  Profile,
} from './pages';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/comidas/:id/in-progress" render={ () => <h1>Prog C</h1> } />
      <Route exact path="/bebidas/:id/in-progress" render={ () => <h1>Prog B</h1> } /> */}
      <Route exact path="/comidas/:id" component={ Details } />
      <Route exact path="/bebidas/:id" component={ Details } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas" component={ Cocktails } />
      {/* <Route path="/explorar/comidas/ingredientes" render={ () => <h1>Ex IC</h1> } />
      <Route path="/explorar/bebidas/ingredientes" render={ () => <h1>Exp IB</h1> } />
      <Route path="/explorar/comidas/area" render={ () => <h1>Not Found</h1> } />
      <Route path="/explorar/comidas" render={ () => <h1>Explore C.</h1> } />
      <Route path="/explorar/bebidas" render={ () => <h1>Explore B.</h1> } /> */}
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      {/* <Route path="/receitas-feitas" render={ () => <h1>Receita Fe.</h1> } />
      <Route path="/receitas-favoritas" render={ () => <h1>Receita Fa.</h1> } /> */}
    </Switch>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
