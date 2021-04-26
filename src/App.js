import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import { Home, Foods } from './pages/index';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/comidas" component={ Foods } />
      </Switch>
    </div>
  );
}

export default App;
