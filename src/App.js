import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginProvider, RecipesProvider } from './components/Providers';
import Router from './components/Router';

function App() {
  return (
    <LoginProvider>
      <RecipesProvider>
        <Router />
      </RecipesProvider>
    </LoginProvider>

  );
}

export default App;
