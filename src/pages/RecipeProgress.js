import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Copy from 'clipboard-copy';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { fetchApi } from '../services/api';
import { saveProgress } from '../services/storage';
import paths from '../routes/paths';

const RecipeProgress = ({ match: { params } }) => {
  const { id } = params;
  const [isFavorite, setFavorite] = useState(false);
  const [recipe, setRecipe] = useState(false);
  const [progress, setProgress] = useState({});
  const location = useLocation();
  const isFoodsPage = location.pathname.includes('comida');
  const history = useHistory();
  const { DONE_RECIPES } = paths;

  useEffect(() => {
    const fetchById = async () => {
      const fetchDetails = await fetchApi({ i: id, isDetails: true, isFoodsPage });
      const key = Object.keys(fetchDetails)[0];
      return fetchDetails[key]['0'];
    };
    fetchById().then((recipeResponse) => setRecipe(recipeResponse));
  }, []);

  useEffect(() => {
    const key = isFoodsPage ? 'meals' : 'cocktails';
    saveProgress(key, id, progress);
  }, [progress]);

  if (!recipe) {
    return <div>Carregando</div>;
  }

  const recipeData = {
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strDrinkThumb || recipe.strMealThumb,
    instructions: recipe.strInstructions,
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
  };

  const handleClick = ({ target }) => {
    if (target.checked) {
      target.nextSibling.style = 'text-decoration: line-through;';
    } else {
      target.nextSibling.style = '';
      target.checked = false;
    }
    setProgress((currentState) => ({
      ...currentState,
      [target.value]: target.checked,
    }));
  };

  const ingredients = Object.keys(recipe)
    .filter((key) => (
      key.includes('Ingredient') && recipe[key]));

  const renderIngredients = () => {
    return ingredients.map((key, index) => (
      <li key={ index }>
        <label htmlFor="ingredient" data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            name=""
            value={ index }
            onClick={ handleClick }
            defaultChecked={ Object.keys(progress).includes(index) }
          />
          <span>{`${recipe[key]} - ${recipe[`strMeasure${index + 1}`]}`}</span>
        </label>
      </li>
    ));
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipeData.image }
        alt="recipePhoto"
        style={ { height: 200 } }
      />
      <h1 data-testid="recipe-title">{recipeData.name}</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          Copy(`http://localhost:3000/comidas/${id}`);
          // inProgressRecipes
          // clipboard-copy
        } }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button
        type="button"
        onClick={ () => setFavorite(!isFavorite) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteIcon"
        />
      </button>
      <h4 data-testid="recipe-category">
        {recipeData.alcoholicOrNot || recipeData.category}
      </h4>
      <h2>Ingredientes</h2>
      <ul>
        {renderIngredients()}
      </ul>
      <h2>Instruções</h2>
      <p data-testid="instructions">{recipeData.instructions}</p>
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        // disabled={ verifyCheck }
        disabled={
          !Object.keys(progress).every((k) => progress[k] === true)
          || Object.keys(progress).length < ingredients.length
        }
        onClick={ () => history.push(DONE_RECIPES) }
      >
        Finalizar Receita
      </button>
      <p>---</p>
      <p>---</p>
      <Footer />
    </>
  );
};

export default RecipeProgress;

RecipeProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.string,
  }).isRequired,
};
