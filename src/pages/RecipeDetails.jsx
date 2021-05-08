import { objectOf } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getRecipe } from '../services/apiServices';
import AppContext from '../contextApi/context';
import RecomendationList from '../components/RecomendationList';
import ButtonInitRecipe from '../components/ButtonInitRecipe';

const RecipeDetails = (props) => {
  const { getIngredients, handleFavorites,
    favoriteRecipes, getMeasures } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { location: { pathname } } = props;
  const [ingredients, setIngredients] = useState();
  const [measures, setMeasures] = useState();
  const [typeRecipe] = useState(() => {
    if (pathname.includes('comidas')) return ['meals', 'comida', 'Meal'];
    if (pathname.includes('bebidas')) return ['drinks', 'bebida', 'Drink'];
  });
  const [isCopied, setIsCopiedStatus] = useState(false);
  const [isFavorite, setIsFavoriteStatus] = useState(false);

  useEffect(() => {
    if (recipe) {
      setIngredients(getIngredients(recipe));
      setMeasures(getMeasures(recipe));
    }
  }, [getIngredients, getMeasures, recipe]);

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
    navigator.clipboard.writeText(window.location.href);
    setIsCopiedStatus(true);
  };

  const favoriteRecipe = () => {
    handleFavorites(recipe, typeRecipe, id);
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
        <button type="button" data-testid="video">
          <a href={ recipe.strYoutube } target="blanc">Ver Vídeo</a>
        </button>
      </div>
      <p data-testid="recipe-category">
        {`Categoria: ${recipe.strAlcoholic || recipe.strCategory}`}
      </p>
      <ul>
        { ingredients
          && ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { `${ingredient} ${measures[index]}` }
            </li>
          ))}
      </ul>
      <div>
        <h4>Instruções</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <RecomendationList type={ typeRecipe[0] } />
      <ButtonInitRecipe
        type={ typeRecipe[0] === 'drinks' ? 'cocktails' : typeRecipe[0] }
      />
    </div>
  );
};

RecipeDetails.propTypes = {
  location: objectOf(),
}.isRequired;

export default RecipeDetails;
