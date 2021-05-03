import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/routes';
import ContextFood from './context/contextFood';
import ContextDrink from './context/contextDrink';

function App() {
  return (
    <ContextDrink>
      <ContextFood>
        <Routes />
      </ContextFood>
    </ContextDrink>
  );
}

export default App;
