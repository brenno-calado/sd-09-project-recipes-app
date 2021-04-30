import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
