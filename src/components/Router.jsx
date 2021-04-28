import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Detalhes from '../pages/Detalhes';
import EmProcesso from '../pages/EmProcesso';
import Explorar from '../pages/Explorar';
import ExplorarTipo from '../pages/ExplorarTipo';
import ExplorarIngredientes from '../pages/ExplorarIngredientes';
import ExplorarArea from '../pages/ExplorarArea';
import Perfil from '../pages/Perfil';
import ReceitasPrincipal from '../pages/ReceitasPrincipal';
import ReceitasLista from '../pages/ReceitasLista';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ ReceitasPrincipal } />
      <Route exact path="/bebidas" component={ ReceitasPrincipal } />
      <Route exact path="/comidas/:id-da-receita" component={ Detalhes } />
      <Route exact path="/bebidas/:id-da-receita" component={ Detalhes } />
      <Route
        exact
        path="/comidas/:id-da-receita/in-progress"
        component={ EmProcesso }
      />
      <Route
        exact
        path="/bebidas/:id-da-receita/in-progress"
        component={ EmProcesso }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarTipo } />
      <Route exact path="/explorar/bebidas" component={ ExplorarTipo } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ExplorarArea } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasLista } />
      <Route exact path="/receitas-favoritas" component={ ReceitasLista } />
    </Switch>
  );
}
