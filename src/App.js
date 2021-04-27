import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
// import rockGlass from './images/rockGlass.svg';
import BottomMenu from './components/BottomMenu';
=======
>>>>>>> be5635b0e91dc7af2e459456d36146e917bf4688
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';

function App() {
  return (
<<<<<<< HEAD
    <BottomMenu />
=======
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
>>>>>>> be5635b0e91dc7af2e459456d36146e917bf4688
  );
}

export default App;
