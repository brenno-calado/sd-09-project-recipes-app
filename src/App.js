import React from 'react';

import Provider from './context/Provider';
import Routes from './pages/Routes';
import './App.css';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
