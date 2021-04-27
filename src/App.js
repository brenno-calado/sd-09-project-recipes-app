import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Common/Components/Header';
import Profile from './Pages/Profile';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="meals">
          <Switch>
            <Route exact path="/" render={ Header } />
            <Route path="/perfil" component={ Profile } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
