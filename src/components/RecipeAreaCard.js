import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeAreaCard = ({ recipeName, recipeImage, index, id, location }) => (
  <CardDeck>
    <Card
      data-testid={ `${index}-recipe-card` }
      key={ index }
    >
      <Card.Body>
        <Link key={ index } to={ `/${location}/${id}` }>
          <Card.Img
            variant="top"
            src={ `${recipeImage}/preview` }
            data-testid={ `${index}-card-img` }
            alt={ `foto de ${recipeName}` }
          />
          <Card.Title data-testid={ `${index}-card-name` }>
            { recipeName }
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  </CardDeck>
);
RecipeAreaCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImage: PropTypes.string,
}.isRequired;
export default RecipeAreaCard;
