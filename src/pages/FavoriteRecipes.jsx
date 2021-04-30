import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import isFavorite from '../images/blackHeartIcon.svg';
import '../App.css';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [copy, setCopy] = useState(false);
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

  const handleShare = (type, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopy(true);
    const timeoutToCopy = 3000;
    setTimeout(() => {
      setCopy(false);
    }, timeoutToCopy);
  };

  const removeFavorite = (id) => {
    const newFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setRecipes(newFavorites);
    setFilter('all');
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const renderRecipes = () => (
    recipes.map((recipe, index) => (
      <div key={ recipe.name }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt="Recipe"
            data-testid={ `${index}-horizontal-image` }
            className="doneImage"
          />
        </Link>
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category} ${recipe.alcoholicOrNot}` }
        </h4>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        </Link>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => handleShare(recipe.type, recipe.id) }
        >
          Compartilhar
        </button>
        { copy && 'Link copiado!' }
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorite }
          onClick={ () => removeFavorite(recipe.id) }
        >
          <img src={ isFavorite } alt="Favoritar" />
        </button>
      </div>
    ))
  );

  return (
    <div>
      <Header page="Receitas Favoritas" />
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
      { renderRecipes() }
    </div>
  );
}

export default FavoriteRecipes;
