import React from 'react';
import { Button } from 'react-bootstrap';

function DetailsBtnShareRecipe() {
  return (
    <Button
      data-testid="share-btn"
      type="button"
      color="primary"
    >
      Share
    </Button>
  );
}

export default DetailsBtnShareRecipe;
