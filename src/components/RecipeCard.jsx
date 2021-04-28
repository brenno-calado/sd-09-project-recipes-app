import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function RecipeCard(props) {
  const { image, recipeName, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Card style={ { width: '18rem' } }>
        <div data-testid={ `${index}-recipe-img` }>
          <Card.Img variant="top" src={ image } />
        </div>
        <Card.Body>
          <div data-testid={ `${index}-recipe-name` }>
            <Card.Title>{recipeName}</Card.Title>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
