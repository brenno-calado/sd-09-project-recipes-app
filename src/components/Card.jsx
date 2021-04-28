import React from 'react';
import { useLocation } from 'react-router-dom';
import './Card.css';

function Card({ item, index }) {
  const location = useLocation();
  const name = (location.pathname === '/comidas') ? 'strMeal' : 'strDrink';
  const thumb = (location.pathname === '/comidas') ? 'strMealThumb' : 'strDrinkThumb';
  return (
    <div data-testid={ `${index}-recipe-card` } className="Card">
      <img src={ item[thumb] } alt="item" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{item[name]}</p>
    </div>
  );
}

export default Card;
