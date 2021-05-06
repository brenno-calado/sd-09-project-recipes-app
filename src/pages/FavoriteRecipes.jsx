import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const removeFavorite = (id) => {
    const removeFromFavorites = favoriteRecipes
      .filter((favorite) => favorite.id !== id);

    setFilteredRecipes(removeFromFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFromFavorites));
  };

  const handleFilter = ({ target }) => {
    switch (target.innerText) {
    default:
      setFilteredRecipes(favoriteRecipes
        .filter(({ type }) => type.includes('')));
      break;
    case 'Foods':
      setFilteredRecipes(favoriteRecipes
        .filter(({ type }) => type.includes('comida')));
      break;
    case 'Drinks':
      setFilteredRecipes(favoriteRecipes
        .filter(({ type }) => type.includes('bebida')));
    }
  };

  const copyToCliboard = ({ type, id }) => {
    const delay = 2000;
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setTimeout(setIsLinkCopied, delay, false);
    setIsLinkCopied(true);
  };

  return (
    <section>
      <Header title="Receitas Favoritas" />

      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
        >
          Foods
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>

      {
        filteredRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="recipe-img"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                width="300"
              />
            </Link>

            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.alcoholicOrNot}` || `${recipe.area} - ${recipe.category}`}
            </span>

            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
            </Link>

            <button
              type="button"
              onClick={ () => copyToCliboard(recipe) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Compartilhar receita"
              />
            </button>

            <button
              type="button"
              onClick={ () => removeFavorite(recipe.id) }

            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="Desfavoritar receita"
              />
            </button>
          </div>
        ))
      }

      { isLinkCopied && (
        <p>Link copiado!</p>
      )}
    </section>
  );
}
