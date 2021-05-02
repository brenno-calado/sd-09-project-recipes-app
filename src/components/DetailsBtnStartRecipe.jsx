import React from 'react';
import './DetailsBtnStartRecipe.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function DetailsBtnStartRecipe({ detailsContext }) {
  const { recipe } = detailsContext;
  console.log(recipe);
  return (
    <Button
      type="button"
      data-testid="start-recipe-btn"
      color="primary"
    >
      Start Recipe
    </Button>
  );
}

DetailsBtnStartRecipe.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default DetailsBtnStartRecipe;
