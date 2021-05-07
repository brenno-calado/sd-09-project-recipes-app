import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../Style/Favorites.css';
import ShareAndFavo from '../components/ShareAndFavo';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [recipes, setRecipes] = useState(favoriteRecipes);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const handleFilter = () => {
      if (filter === 'all') {
        setRecipes(favoriteRecipe);
      } else {
        setRecipes(favoriteRecipe.filter((recipe) => recipe.type === filter));
      }
    };
    handleFilter();
  }, [filter]);

  const renderRecipes = () => (
    recipes.map((recipe, index) => (
      <Link to={ `/${recipe.type}s/${recipe.id}` } key={ recipe.name }>
        <div className="doneCard">
          <img
            src={ recipe.image }
            alt="Recipe"
            data-testid={ `${index}-horizontal-image` }
            className="doneImage"
          />
          <div className="contentDoneCard">
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.area} - ${recipe.category} ${recipe.alcoholicOrNot}` }
            </h4>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            <div className="shareAndFavoFavorites">
              <ShareAndFavo
                match={ {
                  params: { id: recipe.id },
                  path: `/${recipe.type}s`,
                  url: `/${recipe.type}s/${recipe.id}`,
                } }
              />
            </div>
          </div>
        </div>
      </Link>
    ))
  );

  return (
    <div>
      <Header page="Favoritas" />
      <div className="doneButtons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Bebidas
        </button>
      </div>
      <div className="doneList">
        { renderRecipes() }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
