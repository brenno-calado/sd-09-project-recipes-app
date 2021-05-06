import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './context';

const Provider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) setFavoriteRecipes(favorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavorites = (recipe, typeRecipe, id) => {
    const newFavorite = {
      id,
      type: typeRecipe[1],
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${typeRecipe[2]}`],
      image: recipe[`str${typeRecipe[2]}Thumb`],
    };
    if (favoriteRecipes
      .find((favorite) => favorite.id === newFavorite.id)) {
      setFavoriteRecipes(favoriteRecipes
        .filter((favorite) => favorite.id !== newFavorite.id));
    } else {
      setFavoriteRecipes([...favoriteRecipes, newFavorite]);
    }
  };

  const getIngredients = (recipe) => {
    let newIngredients = [];
    if (recipe) {
      Object.keys(recipe).forEach((item) => {
        if (item.includes('strIngredient') && recipe[item]) {
          newIngredients = [
            ...newIngredients,
            recipe[item],
          ];
        }
      });
      return newIngredients;
    }
  };

  const value = {
    getIngredients,
    favoriteRecipes,
    handleFavorites,
  };
  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
