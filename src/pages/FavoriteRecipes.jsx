import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import FilterButtons from '../components/favoriteRecipes/FilterButtons';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Header.css';

const copy = require('clipboard-copy');

function ReceitasFavoritas() {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const [filteredRecipesList, setFilteredRecipesList] = useState([]);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setFilteredRecipesList(favoriteRecipes);
  }, [favoriteRecipes]);

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [setFavoriteRecipes]);

  const copyShareLink = async (recipe) => {
    setHasCopied(true);
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
  };

  const unfavoriteRecipe = (id) => {
    const foundRecipe = favoriteRecipes.find((recipe) => recipe.id === id);
    favoriteRecipes.splice(favoriteRecipes.indexOf(foundRecipe), 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavoriteRecipes(favoriteRecipes);
    window.location.reload();
  };

  const favoriteButton = (recipe, index) => (
    <input
      data-testid={ `${index}-horizontal-favorite-btn` }
      type="image"
      src={ blackHeartIcon }
      alt="Favoritar"
      onClick={ () => unfavoriteRecipe(recipe.id) }
    />
  );

  const shareButton = (recipe, index) => (
    <button
      type="button"
      onClick={ () => copyShareLink(recipe) }
    >
      { hasCopied
        ? <span>Link copiado!</span>
        : (
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Compartilhar"
          />) }
    </button>
  );

  const renderCards = (recipe, index) => (
    <div
      key={ recipe.id }
      className="card align-items-center m-2 flex-wrap"
    >
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
          width="100px"
          height="100px"
        />
        <span data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida'
            ? (recipe.area !== '' && (`${recipe.area} - ${recipe.category}`))
                || recipe.category
            : recipe.alcoholicOrNot }
        </span>
        <span className="card-title" data-testid={ `${index}-horizontal-name` }>
          {recipe.name}
        </span>
      </Link>
      { shareButton(recipe, index) }
      { favoriteButton(recipe, index) }
    </div>
  );

  const renderRecipes = (foodType) => {
    switch (foodType) {
    case 'comida':
      setFilteredRecipesList(
        favoriteRecipes.filter((recipe) => recipe.type === 'comida'),
      );
      break;
    case 'bebida':
      setFilteredRecipesList(
        favoriteRecipes.filter((recipe) => recipe.type === 'bebida'),
      );
      break;
    default:
      setFilteredRecipesList(favoriteRecipes);
    }
  };

  return (
    <>
      <Header page="Receitas Favoritas" hasSearchButton={ false } />
      <FilterButtons renderRecipes={ renderRecipes } />
      { favoriteRecipes !== null && filteredRecipesList.map((recipe, index) => (
        renderCards(recipe, index)
      )) }
    </>
  );
}

export default ReceitasFavoritas;

/*
  <input
    data-testid={ `${index}-horizontal-share-btn` }
    type="image"
    src={ shareIcon }
    alt="Compartilhar"
    onClick={ (event) => copyShareLink(event, recipe) }
  />
*/
