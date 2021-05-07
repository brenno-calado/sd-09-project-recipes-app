import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { useRecipes } from '../hooks';
import '../styles/InProgress.css';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';
import { RecipesContext } from '../context';

const formatIngredients = (details) => Object.keys(details)
  .filter((key) => key.includes('Ingredient') && details[key])
  .map((key) => {
    const ingredientID = key.split('strIngredient')[1];
    return `${details[key]} - ${details[`strMeasure${ingredientID}`]}`;
  });

function EmProcesso() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});

  const { values: { inProgressRecipes },
    actions: { addRecipeToInProgress, addRecipeToDone } } = useContext(RecipesContext);
  const { getRecipes } = useRecipes();

  const type = pathname.includes('comidas')
    ? ['comidas', 'Meal', 'meals']
    : ['bebidas', 'Drink', 'cocktails'];

  const [ingredientsList, setIngredientList] = useState(
    inProgressRecipes && inProgressRecipes[type[2]] && inProgressRecipes[type[2]][id]
      ? inProgressRecipes[type[2]][id]
      : [],
  );

  useEffect(() => {
    async function loadRecipe() {
      const details = await getRecipes(type[0], id);
      const recipeObj = {
        id: details[`id${type[1]}`],
        type: type[0].substring(0, type[0].length - 1),
        area: details.strArea || '',
        category: details.strCategory || '',
        alcoholicOrNot: type[1] === 'Drink' ? details.strAlcoholic : '',
        name: details[`str${type[1]}`],
        image: details[`str${type[1]}Thumb`],
        instructions: details.strInstructions,
        video: details.strYoutube,
        ingredients: formatIngredients(details),
      };
      setRecipeDetails(recipeObj);
    }

    loadRecipe();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleCheck(target) {
    const item = target.name;
    const checked = ingredientsList.includes(item);
    setIngredientList((prev) => (checked
      ? prev.filter((ingr) => ingr !== (item))
      : [...prev, Number(item)]));
  }

  useEffect(() => {
    const obj = { [id]: ingredientsList };
    addRecipeToInProgress(type[2], obj);
  }, [ingredientsList]);

  function handleClick() {
    addRecipeToDone(recipeDetails);
    history.push('/receitas-feitas');
  }

  function renderIngredients() {
    const ingredients = recipeDetails.ingredients || [];
    const progress = inProgressRecipes[type[2]][id];
    return ingredients.map((ingredient, index) => (
      <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          id={ ingredient }
          name={ index + 1 }
          onChange={ ({ target }) => handleCheck(target) }
          className="inputClass"
          checked={ progress.includes(index + 1) }
        />
        <label
          htmlFor={ ingredient }
          className="inputClass"
        >
          { ingredient }
        </label>
      </div>
    ));
  }

  return (
    loading
      ? <Loading />
      : (
        <main>
          <img
            src={ recipeDetails.image }
            alt={ recipeDetails.name }
            data-testid="recipe-photo"
            className="details__image"
          />
          <div className="details__horizontal-container">
            <div>
              <h2 data-testid="recipe-title">{recipeDetails.name}</h2>
              <p data-testid="recipe-category">
                {type[1] === 'Drink'
                  ? recipeDetails.alcoholicOrNot : recipeDetails.category}
              </p>
            </div>
            <div>
              <LikeButton recipeDetails={ recipeDetails } />
              <ShareButton category={ type[0] } id={ id } />
            </div>
          </div>
          { renderIngredients() }
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ handleClick }
            disabled={
              recipeDetails.ingredients
              && ingredientsList.length !== recipeDetails.ingredients.length
            }
          >
            Finalizar
          </button>
        </main>
      )

  );
}

export default EmProcesso;
