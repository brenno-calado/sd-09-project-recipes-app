import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { MyContextProvider } from './MyContext';

function App() {
  return (
    <MyContextProvider>
      <Header />
    </MyContextProvider>
  );
}

export default App;
