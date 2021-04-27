import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function RecipeCard(props) {
  const { image, recipeName } = props;
  return (
    <Card style={ { width: '18rem' } }>
      <Card.Img variant="top" src={ image } />
      <Card.Body>
        <Card.Title>{recipeName}</Card.Title>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
};

export default RecipeCard;
