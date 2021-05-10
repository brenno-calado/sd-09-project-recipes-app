import { number, object } from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contextApi/context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RecipeCardDone = ({ recipe, index }) => {
  const { id } = recipe;
  const { favoriteRecipes, handleFavorites } = useContext(AppContext);
  const [isCopied, setIsCopiedStatus] = useState(false);
  const [isFavorite, setIsFavoriteStatus] = useState(false);
  const [typeRecipe] = useState(() => {
    if (recipe.alcoholicOrNot) return ['drinks', 'bebida', 'Drink'];
    return ['meals', 'comida', 'Meal'];
  });

  useEffect(() => {
    if (favoriteRecipes.find((favorite) => favorite.id === id)) {
      setIsFavoriteStatus(true);
    } else {
      setIsFavoriteStatus(false);
    }
  }, [favoriteRecipes, id]);

  const type = () => {
    if (recipe.alcoholicOrNot) return 'bebidas';
    return 'comidas';
  };

  const copyToClipboard = () => {
    const url = `http://localhost:3000/${type()}/${recipe.id}`;
    navigator.clipboard.writeText(url);
    setIsCopiedStatus(true);
  };

  const favoriteRecipe = () => {
    handleFavorites(recipe, typeRecipe, id);
  };

  return (
    <div>
      <Link to={ `/${type()}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt="recipe-thumb"
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '25vw' } }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.alcoholicOrNot || `${recipe.area} - ${recipe.category}`}
      </p>
      <Link to={ `/${type()}/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          {recipe.name}
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {recipe.doneDate}
      </p>
      <button type="button" onClick={ copyToClipboard }>
        { isCopied ? 'Link copiado!' : <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share-icon"
        />}
      </button>
      <button type="button" onClick={ favoriteRecipe }>
        <img
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
        />
      </button>
      { recipe.tags && recipe.tags.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      )) }
    </div>
  );
};

RecipeCardDone.propTypes = {
  recipe: object,
  index: number,
}.isRequired;

export default RecipeCardDone;
