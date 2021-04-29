import React from 'react';
import { Route } from 'react-router-dom';
import { ContextProvider } from './contexts/Context.tsx';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <Route path="/header" component={ Header } />
    </ContextProvider>
  );
}

export default App;
