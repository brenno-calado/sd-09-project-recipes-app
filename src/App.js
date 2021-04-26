import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/comidas" component={ Foods } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
