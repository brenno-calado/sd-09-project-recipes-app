import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

import './css/StartRecipeButton.css';

const StartRecipeButton = (props) => {
  const { pathname } = props;

  return (
    <div>
      <Link to={ `${pathname}/in-progress` }>
        <button
          className="btnStart btn btn-primary btn-block"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
};

StartRecipeButton.propTypes = {
  pathname: string,
}.isRequired;

export default StartRecipeButton;
