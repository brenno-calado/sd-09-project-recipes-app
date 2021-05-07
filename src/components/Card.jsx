import React from 'react';
import { Link } from 'react-router-dom';
import { objectOf, number } from 'prop-types';
import './Card.css';

function Card({ item, index, type, cardTestid, titleTestid }) {
  const name = (type === 'comidas') ? 'strMeal' : 'strDrink';
  const thumb = (type === 'comidas') ? 'strMealThumb' : 'strDrinkThumb';
  const id = (type === 'comidas') ? 'idMeal' : 'idDrink';

  return (
    <Link to={ `/${type}/${item[id]}` }>
      <div data-testid={ cardTestid || `${index}-recipe-card` } className="Card">
        <img src={ item[thumb] } alt="item" data-testid={ `${index}-card-img` } />
        <p data-testid={ titleTestid || `${index}-card-name` }>{item[name]}</p>
      </div>
    </Link>
  );
}

Card.propTypes = {
  item: objectOf(),
  index: number,
}.isRequired;

export default Card;
