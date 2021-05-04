import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Recomended({ url, index, image, name }) {
  return (
    <Link to={ url }>
      <Card className="m-1" data-testid={ `${index}-recomendation-card` }>
        <Card.Img
          variant="top"
          data-testid={ `${index}-recomendation-img` }
          src={ image }
        />
        <Card.Body>
          <Card.Title data-testid={ `${index}-recomendation-title` }>{name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

Recomended.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
  image: PropTypes.string,
}.isRequired;
