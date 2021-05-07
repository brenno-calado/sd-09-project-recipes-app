import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function RecipeCard({ index, thumbUrl, name, redirectUrl }) {
  return (
    <Card style={ { width: '10rem' } }>
      <Link to={ redirectUrl }>
        <section data-testid={ `${index}-recipe-card` }>
          <Card.Img
            src={ thumbUrl }
            alt="Foto da receita"
            data-testid={ `${index}-card-img` }
          />
          <Card.Title className="ml-2 text-muted" data-testid={ `${index}-card-name` }>
            {name}
          </Card.Title>
        </section>
      </Link>
    </Card>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
};
