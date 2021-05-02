import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Ingredients = ({ ingredientsList, explorerPath }) => (
  <div>
    <CardDeck>
      { ingredientsList.map(
        (ingredient, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            key={ index }
          >
            <Link key={ index } to={ `/${explorerPath}/${ingredient.name}` }>
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
            </Link>
          </Card>),
      )}
    </CardDeck>
  </div>
);
Ingredients.propTypes = {
  ingredientsList: PropTypes.oneOfType(
    [PropTypes.array, PropTypes.object],
  ).isRequired,
  explorerPath: PropTypes.string.isRequired,
};
export default Ingredients;
