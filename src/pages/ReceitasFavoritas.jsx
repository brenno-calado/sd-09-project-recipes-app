import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import isFavIcon from '../images/blackHeartIcon.svg';
import shareImg from '../images/shareIcon.svg';
import '../styles/recipes.css';

const copy = require('clipboard-copy');

function ReceitasFavoritas() {
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));
  const [message, setMessage] = useState(false);

  const recipeType = (index, area, category, alcohol) => {
    if (alcohol === '') {
      return (
        <h4 data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</h4>
      );
    }
    return (
      <h4 data-testid={ `${index}-horizontal-top-text` }>{ alcohol }</h4>
    );
  };

  const favoriteRemove = (recipe) => {
    const updatedFav = favs;
    const index = updatedFav.findIndex((item) => item.id === recipe.id);
    updatedFav.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFav));
  };

  const filterFood = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = recipes.filter((recipe) => recipe.alcoholicOrNot === '');
    return filteredRecipes;
  };

  const filterDrink = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = recipes.filter((recipe) => recipe.alcoholicOrNot !== '');
    return filteredRecipes;
  };

  function shareHandler(alcohol, id) {
    if (alcohol === '') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }
    setMessage(true);
  }

  function foodOrDrink(alcohol) {
    if (alcohol === '') {
      return '/comidas/';
    }
    return '/bebidas/';
  }

  return (
    <>
      <Header textProp="Receitas Favoritas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavs(JSON.parse(localStorage.getItem('favoriteRecipes'))) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFavs(filterFood()) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavs(filterDrink()) }
        >
          Drink
        </button>
      </div>
      {favs.map((item, index) => (
        <div className="fav-card" key={ Math.random() }>
          <Link to={ `${foodOrDrink(item.alcoholicOrNot)}${item.id}` }>
            <img
              src={ item.image }
              alt="Recipe"
              className="fav-img"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          {recipeType(index, item.area, item.category, item.alcoholicOrNot)}
          <Link to={ `${foodOrDrink(item.alcoholicOrNot)}${item.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>
          </Link>
          <div>
            <button
              type="button"
              onClick={ () => shareHandler(item.alcoholicOrNot, item.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareImg }
                alt="Share"
              />
            </button>
            {message && <p>Link copiado!</p>}
          </div>
          <button
            type="button"
            onClick={ () => {
              favoriteRemove(item);
              return setFavs(JSON.parse(localStorage.getItem('favoriteRecipes')));
            } }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ isFavIcon }
              alt="Favorite"
            />
          </button>
        </div>
      ))}
    </>
  );
}

export default ReceitasFavoritas;
