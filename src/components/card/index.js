import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

function index({ image, name, id, type, indexCard }) {
  return (
    <Link
      to={ `/${type}/${id}` }
      className="container-card"
      data-testid={ `${indexCard}-recipe-card` }
    >
      <img
        className="img-card"
        src={ image }
        alt="product"
        data-testid={ `${indexCard}-card-img` }
      />
      <h4 data-testid={ `${indexCard}-card-name` }>{ name }</h4>
    </Link>
  );
}

export default index;
