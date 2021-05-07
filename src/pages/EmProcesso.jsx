import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { useRecipes } from '../hooks';
import '../styles/InProgress.css';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';
import { RecipesContext } from '../context';

function EmProcesso() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});

  const { values: { inProgressRecipes },
    actions: { addRecipeToInProgress, addRecipeToDone } } = useContext(RecipesContext);
  const { getRecipes } = useRecipes();

  const type = pathname.includes('comidas') ? ['comidas', 'Meal'] : ['bebidas', 'Drink'];

  const [ingredientsList, setIngredientList] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    async function loadRecipe() {
      const details = await getRecipes(type[0], id);
      setRecipeDetails(details);
    }

    loadRecipe();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleCheck(target) {
    const item = target.name;
    const checked = ingredientsList.includes(item);
    const nameKey = pathname.includes('comidas') ? 'cocktails' : 'meals';

    setIngredientList((prev) => (checked
      ? prev.filter((ingr) => ingr !== (item))
      : [...prev, item]));

    //  const obj = { [nameKey]: { [id]: ingredientsList } };

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [nameKey]: { [id]: ingredientsList },
    }));
    // addRecipeToInProgress([nameKey]: { [id]: ingredientsList });
  }

  function handleClick() {
    addRecipeToDone(recipeDetails);
    history.push('/receitas-feitas');
  }
  useEffect(() => {
    const ingredients = Object.keys(recipeDetails)
      .filter((key) => key.includes('Ingredient') && recipeDetails[key]);
    if (ingredientsList.length === ingredients.length) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [ingredientsList.length, recipeDetails]);

  function renderIngredients() {
    const ingredients = Object.keys(recipeDetails)
      .filter((key) => key.includes('Ingredient') && recipeDetails[key])
      .map((key) => {
        const ingredientID = key.split('strIngredient')[1];
        return `${recipeDetails[key]} - ${recipeDetails[`strMeasure${ingredientID}`]}`;
      });
    return ingredients.map((ingredient, index) => (
      <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          id={ ingredient }
          name={ index + 1 }
          onChange={ ({ target }) => handleCheck(target) }
        />
        <label
          htmlFor={ ingredient }
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
            src={ recipeDetails[`str${type[1]}Thumb`] }
            alt={ recipeDetails[`str${type[1]}`] }
            data-testid="recipe-photo"
            className="details__image"
          />
          <div className="details__horizontal-container">
            <div>
              <h2 data-testid="recipe-title">{recipeDetails[`str${type[1]}`]}</h2>
              <p data-testid="recipe-category">
                {type[1] === 'Drink'
                  ? recipeDetails.strAlcoholic : recipeDetails.strCategory}
              </p>
            </div>
            <div>
              <LikeButton recipeDetails={ recipeDetails } />
              <ShareButton />
            </div>
          </div>
          { renderIngredients() }
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ handleClick }
            disabled={ disable }
          >
            Finalizar
          </button>
        </main>
      )

  );
}

export default EmProcesso;
