import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const Ingredients = ({ ingredientsList }) => (
  <div>
    <CardDeck>
      { ingredientsList.map(
        (ingredient, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            key={ index }
          >
            <Card.Img
              variant="top"
              src={ ingredient.thumbnailURL }
              data-testid={ `${index}-card-img` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
              >
                { ingredient.name }
              </Card.Title>
            </Card.Body>
          </Card>),
      )}
    </CardDeck>
  </div>
);
Ingredients.propTypes = {
  ingredientsList: PropTypes.oneOfType(
    [PropTypes.array, PropTypes.object],
  ).isRequired,
};
export default Ingredients;
