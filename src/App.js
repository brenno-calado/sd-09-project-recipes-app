import React from 'react';
import { ContextProvider } from './contexts/Context';
import { Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import './styles/App.css';

function App() {
  return (
    <ContextProvider>
      <Route path="/header" component={ Header } />
    </ContextProvider>
  );
}

export default App;
