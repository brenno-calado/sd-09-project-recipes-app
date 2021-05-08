import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function RecipeCard({
  image, name, recipeCArdId, cardImageId, cardNameId, type, codeId }) {
  return (
    <Link to={ `/${type}/${codeId}` }>
      <Card
        style={ { width: '9rem', margin: '5px' } }
        data-testid={ recipeCArdId }
      >
        <Card.Img
          style={ { height: '8rem' } }
          variant="top"
          data-testid={ cardImageId }
          src={ image }
          alt={ name }
          type={ type }
        />
        <Card.Body>
          <Button
            variant="outline-success"
            style={ { height: '2rem', width: '100%', overflow: 'hidden' } }
          >
            <Card.Title
              style={ { textDecoration: 'none', fontSize: '1rem' } }
              data-testid={ cardNameId }
            >
              { name }
            </Card.Title>
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
}

RecipeCard.propTypes = {
  image: string,
  name: string,
  recipeCArdId: string,
  cardImageId: string,
  cardNameId: string,
  type: string,
  codeId: string,
};

RecipeCard.defaultProps = {
  image: '',
  name: '',
  recipeCArdId: '',
  cardImageId: '',
  cardNameId: '',
  type: '',
  codeId: '',
};

export default RecipeCard;
