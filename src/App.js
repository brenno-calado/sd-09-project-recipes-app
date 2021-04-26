import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Principal from './pages/Principal';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Principal } />
    </BrowserRouter>
  );
}

export default App;
