import React, { useContext, useEffect, useState } from 'react';
import { RecipeContext } from '../../Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FaveDrinkBtn() {
  const { recipeSpec } = useContext(RecipeContext);
  const [favorited, setFavorited] = useState(false);
  const {
    idDrink,
    strDrink,
    strAlcoholic,
    strCategory,
    strDrinkThumb,
  } = recipeSpec;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.length > 0) {
      setFavorited(favoriteRecipes.some((recipe) => recipe.id === idDrink));
    }
  }, [setFavorited, idDrink]);

  const handleFavorites = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) { favoriteRecipes = []; }
    if (!favorited) {
      const currentRecipe = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipes, currentRecipe]));
      return setFavorited(true);
    }
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes.filter((recipe) => recipe.id !== idDrink)));
    setFavorited(false);
  };

  return (
    <button type="button" onClick={ () => handleFavorites() }>
      <img
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
        alt="botão de compartilhar"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FaveDrinkBtn;
