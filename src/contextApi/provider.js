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

  const handleFavorites = (newFavorite) => {
    if (favoriteRecipes
      .find((favorite) => favorite.id === newFavorite.id)) {
      setFavoriteRecipes(favoriteRecipes
        .filter((recipe) => recipe.id !== newFavorite.id));
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

export default Provider;
