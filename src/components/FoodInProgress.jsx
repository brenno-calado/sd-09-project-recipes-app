import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { objectOf } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { fetchRecipeDetails } from '../services/fetchRecipes';
import '../pages/Styles/Details.css';
import LikeBtn from './LikeBtn';

function FoodInProgress() {
  const [allIngrdients, setAllIngrdients] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [progress, setInProgress] = useState({});
  const location = useLocation();
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strArea,
    strTags,
  } = recipe;
  const idRecipe = location.pathname.split('/')[2];

  const getLocalStorage = () => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getStorage !== null) {
      const result = getStorage.meals[idRecipe];
      return result;
    } return [];
  };
  const ingredientsDone = getLocalStorage();

  useEffect(() => {
    fetchRecipeDetails('meals', idRecipe).then((data) => setRecipe(data));
  }, [idRecipe]);

  useEffect(() => {
    const getIngredients = () => {
      const ingredients = [];
      const inProgress = {};
      const ingreQtt = Object.keys(recipe)
        .filter((item) => item.includes('strIngredient'));
      const measureQtt = Object.keys(recipe)
        .filter((item) => item.includes('strMeasure'));
      ingreQtt.forEach((item, index) => {
        if (recipe[item] !== null && recipe[item] !== '') {
          const checkProgress = ingredientsDone.includes(recipe[item]);
          ingredients.push({
            name: recipe[item],
            quantity: recipe[measureQtt[index]],
          });
          inProgress[recipe[item]] = checkProgress;
        }
      });
      setInProgress(inProgress);
      setAllIngrdients(ingredients);
    };
    getIngredients();
  }, [idRecipe, recipe]);

  const isDisabled = Object.values(progress).every((ingr) => ingr === true);

  const handleClick = () => {
    const doneRecipesLocal = [];
    const date = new Date().toString();
    const doneRecipe = {
      id: idRecipe,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: date,
      tags: strTags,
    };
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes !== null) {
      getDoneRecipes.concat(doneRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(getDoneRecipes));
    } else {
      doneRecipesLocal.concat(doneRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesLocal));
    }
  };
  const renderButton = () => (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-recipe-btn"
        disabled={ !isDisabled }
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </Link>
  );

  const handleChange = ({ target }) => {
    setInProgress({
      ...progress,
      [target.id]: target.checked,
    });

    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (previousProgress !== null) {
      const savedIngredients = previousProgress.meals[idRecipe];
      const includes = savedIngredients.includes(target.id);
      const deleteItem = savedIngredients.indexOf(target.id);

      switch (includes) {
      case false:
        savedIngredients.push(target.id);
        localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
        break;
      default:
        savedIngredients.splice(deleteItem, 1);
        localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
        break;
      }
    } else {
      const theProgress = {
        cocktails: {},
        meals: {
          [idRecipe]: [target.id],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(theProgress));
    }
  };

  const shareBtn = async () => {
    const splitBar = location.pathname.split('/');
    const recipeLink = splitBar[1].concat('/', splitBar[2]);
    const link = `http://localhost:3000/${recipeLink}`;
    setIsLinkCopied(true);
    return navigator.clipboard.writeText(link);
  };

  return (
    <div className="Details">
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <div className="title-btns">
        <div>
          <h1 data-testid="recipe-title">{strMeal}</h1>
          <h3 data-testid="recipe-category">{strCategory}</h3>
        </div>
        <div>
          <button type="button" data-testid="share-btn" onClick={ shareBtn }>
            <img src={ shareIcon } alt="Share button" />
          </button>
          <LikeBtn recipe={ recipe } />
          {isLinkCopied && <p>Link copiado!</p>}
        </div>
      </div>
      <div className="ingredients">
        <h2>Ingredients</h2>
        <div>
          <form>
            {allIngrdients.map(({ name, quantity }, index) => (
              <label
                key={ name }
                htmlFor={ name }
                className={ progress[name] ? 'on' : 'off' }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  id={ name }
                  type="checkbox"
                  onChange={ handleChange }
                  checked={ progress[name] }
                />
                {`- ${name} - ${quantity}`}
              </label>
            ))}
          </form>
        </div>
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      {/* {!done && renderButton()} */}
      { renderButton() }
    </div>
  );
}

FoodInProgress.propTypes = {
  recipe: objectOf(),
}.isRequired;

export default FoodInProgress;
