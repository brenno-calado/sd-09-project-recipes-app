import React, { useState } from 'react';
import clipboard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import './FavoriteRecipesScreen.css';
import Header from '../../Components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipesScreen() {
  const recipeSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [copy, setCopy] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipeSave);

  const filterRecipes = (option) => {
    const filterSelected = !option
      ? recipeSave
      : recipeSave.filter((recipe) => option === recipe.type);
    setFavoriteRecipes(filterSelected);
  };

  const copyLinkRecipe = (recipe) => {
    clipboard(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopy(true);
  };

  const disfavorRecipe = (id) => {
    const toFavorite = favoriteRecipes.filter((recipe) => id !== recipe.id);
    setFavoriteRecipes(toFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(toFavorite));
  };

  return (
    <div className="favorite-recipes-main-container">
      <Header title="Receitas Favoritas" />
      <section className="button-category-favorite-recipes-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </section>

      <div className="list-favorite-recipes-container">
        {favoriteRecipes.map((recipe, index) => (
          <div key={ recipe.id }>

            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '50vh' } }
              />
            </Link>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}
            </p>

            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </Link>

            <button
              type="button"
              onClick={ () => copyLinkRecipe(recipe) }
            >
              <img
                src={ shareIcon }
                alt="Share Button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              {copy && <p>Link copiado!</p>}
            </button>

            <button
              type="button"
              onClick={ () => disfavorRecipe(recipe.id) }
            >
              <img
                src={ blackHeartIcon }
                alt="Favorite Button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipesScreen;
