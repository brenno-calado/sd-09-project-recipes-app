import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginProvider, RecipesProvider, ScreenProvider } from './components/Providers';
import Router from './components/Router';

function App() {
  return (
    <LoginProvider>
      <ScreenProvider>
        <RecipesProvider>
          <Router />
        </RecipesProvider>
      </ScreenProvider>
    </LoginProvider>

  );
}

export default App;
