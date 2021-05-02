import React from 'react';
import { Button } from 'react-bootstrap';

function DetailsBtnFavoriteRecipe() {
  return (
    <Button
      data-testid="favorite-btn"
      type="button"
      color="primary"
    >
      Favorite it
    </Button>
  );
}

export default DetailsBtnFavoriteRecipe;
