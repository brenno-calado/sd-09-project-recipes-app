import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {
  return (
    <div className="meals">
      <Route path="/" component={ Login } />
    </div>
  );
}

export default App;
