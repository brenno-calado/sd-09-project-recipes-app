import { objectOf } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import IngredientsList from '../components/IngredientsList';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getRecipe from '../services/apiServices';
import AppContext from '../contextApi/context';

const RecipeInProgress = (props) => {
  const { getIngredients, handleFavorites, favoriteRecipes } = useContext(AppContext);
  const { id } = useParams();
  const { location: { pathname } } = props;
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState();
  const [typeRecipe] = useState(() => {
    if (pathname.includes('comidas')) return ['meals', 'comida', 'Meal'];
    if (pathname.includes('bebidas')) return ['drinks', 'bebida', 'Drink'];
  });
  const [isCopied, setIsCopiedStatus] = useState(false);
  const [isFavorite, setIsFavoriteStatus] = useState(false);

  useEffect(() => {
    if (recipe) setIngredients(getIngredients(recipe));
  }, [getIngredients, recipe]);

  useEffect(() => {
    getRecipe(id, typeRecipe[0]).then((data) => setRecipe(data));
  }, [id, typeRecipe]);

  useEffect(() => {
    if (favoriteRecipes.find((favorite) => favorite.id === id)) {
      setIsFavoriteStatus(true);
    } else {
      setIsFavoriteStatus(false);
    }
  }, [favoriteRecipes, id]);

  const copyToClipboard = () => {
    const maxIndex = window.location.href.lastIndexOf('/');
    navigator.clipboard.writeText(window.location.href.slice(0, maxIndex));
    setIsCopiedStatus(true);
  };

  const favoriteRecipe = () => {
    const newFavorite = {
      id,
      type: typeRecipe[1],
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${typeRecipe[2]}`],
      image: recipe[`str${typeRecipe[2]}Thumb`],
    };
    handleFavorites(newFavorite);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { width: '25vw' } }
        src={ recipe[`str${typeRecipe[2]}Thumb`] }
        alt="recipe thumbnail"
      />
      <h2 data-testid="recipe-title">
        { recipe[`str${typeRecipe[2]}`]}
      </h2>
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyToClipboard }
        >
          { isCopied ? 'Link copiado!' : 'Copiar Link'}
        </button>
        <button type="button" onClick={ favoriteRecipe }>
          <img
            type="button"
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
          />
        </button>
      </div>
      <p data-testid="recipe-category">{`Categoria: ${recipe.strCategory}`}</p>
      { ingredients
        && (
          <IngredientsList
            ingredients={ ingredients }
            type={ typeRecipe[0] === 'drinks' ? 'cocktails' : typeRecipe }
          />) }
      <div>
        <h4>Instruções</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
};

RecipeInProgress.propTypes = {
  location: objectOf(),
}.isRequired;

export default RecipeInProgress;
