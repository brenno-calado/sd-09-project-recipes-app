import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  return (
    <div className="meals">
      <Route path="/" component={ Login } />
      <Route path="/explorar/comidas" component={ Login } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/bebidas" component={ Login } />
      <Footer />
    </div>
  );
}

export default App;
