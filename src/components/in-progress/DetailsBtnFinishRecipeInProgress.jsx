import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function DetailsBtnFinishRecipeInProgress({ detailsContext }) {
  const { recipe } = detailsContext;
  const handleClick = () => {
    localStorage.setItem('doneRecipes', recipe);
  };

  return (
    <Link to="/receitas-feitas">
      <Button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finish Recipe
      </Button>
    </Link>
  );
}

DetailsBtnFinishRecipeInProgress.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default DetailsBtnFinishRecipeInProgress;
