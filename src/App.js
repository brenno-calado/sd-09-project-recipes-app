import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import rockGlass from './images/rockGlass.svg';
import actionTeste from './Redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const { dispatchTeste } = props;
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      {/* <button type="button" onClick={ () => dispatchTeste('xablau') }>
        Teste
      </button> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTeste: (frase) => dispatch(actionTeste(frase)),
});

export default connect(null, mapDispatchToProps)(App);
