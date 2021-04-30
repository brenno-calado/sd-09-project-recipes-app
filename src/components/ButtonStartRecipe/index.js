import React, { Component } from 'react';
import './Style.css';

class index extends Component {
  render() {
    return (
      <button data-testid="start-recipe-btn" type="button" className="start-recipe-btn">
        Iniciar Receita
      </button>
    );
  }
}

export default index;
