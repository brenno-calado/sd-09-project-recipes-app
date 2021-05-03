import React, { useEffect, useState } from 'react';
import { objectOf } from 'prop-types';
import { useLocation } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function LikeBtn({ recipe }) {
  const [like, setLike] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const location = useLocation();
  const type = location.pathname.includes('comidas') ? 'comida' : 'bebida';
  const recipeToSave = type === 'comida'
    ? {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }
    : {
      id: recipe.idDrink,
      type: 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };

  useEffect(() => {
    const checkLiked = () => {
      const likedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (likedRecipes) {
        const isLiked = likedRecipes
          .find((liked) => liked.type === type && liked.id === recipeToSave.id);
        if (isLiked) setLike(true);
      }
      setFavoriteRecipes(likedRecipes);
    };
    checkLiked();
  }, []);

  const likeRecipe = () => {
    switch (like) {
    case false: {
      const toSave = [...favoriteRecipes || [], recipeToSave];
      localStorage.setItem('favoriteRecipes', JSON.stringify(toSave));
      setFavoriteRecipes(toSave);
      break;
    }
    default: {
      const toSave = favoriteRecipes
        .filter((favorite) => favorite.id !== recipeToSave.id)
        .filter((favorite) => favorite.name !== recipeToSave.name);
      localStorage.setItem('favoriteRecipes', JSON.stringify(toSave));
      setFavoriteRecipes(toSave);
      break;
    }
    }
    setLike(!like);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ likeRecipe }
        src={ like ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ like ? blackHeartIcon : whiteHeartIcon } alt="Favorite button" />
      </button>
    </div>
  );
}

LikeBtn.propTypes = {
  recipe: objectOf(),
}.isRequired;

export default LikeBtn;
