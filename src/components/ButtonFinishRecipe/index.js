import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

class index extends Component {
  isAllRecipesDone() {
    const ingredientes = document.querySelectorAll('input[type=checkbox]');
    console.log(ingredientes);
    return false;
  }

  render() {
    const { isDisabled } = this.props;
    console.log(isDisabled);
    return (
      <Link to="/receitas-feitas">
        <button
          className="finish-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDisabled }
          onClick={ () => console.log('Teste') }
        >
          Finalizar Receita
        </button>
      </Link>
    );
  }
}

export default index;
