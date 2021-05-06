import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMealsById, fetchDrinkById } from '../services/index';
import { filterIngredients } from '../services/recipes';

function IngredientsList({ id, type }) {
  const [ingredients, setIngredients] = useState();
  const [currentRecipe, setCurrentRecipe] = useState();
  const [recipeCompleted, setRecipeCompleted] = useState(false);
  // const [recipeStarted, setRecipeStarted] = useState(false);
  const recipeId = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeDetails = type === 'meals'
        ? await fetchMealsById(id) : await fetchDrinkById(id);
      const recipeIngredients = recipeDetails && filterIngredients(recipeDetails);
      console.log(recipeIngredients);
      return setCurrentRecipe(recipeDetails);
    };
    fetchRecipe();
  }, [id, type]);

  useEffect(() => {
    if (currentRecipe) setIngredients(filterIngredients(currentRecipe[0]));
  }, [currentRecipe]);

  useEffect(() => () => {
    // const recipeId = currentRecipe.strMeal || currentRecipe.strDrink;
    const statusStorage = JSON.parse(localStorage.getItem('recipesStatus'));
    const savedStatus = {
      ...statusStorage,
      [recipeId.id]: document.querySelector('.ingredients-checkbox').innerHTML,
    };
    console.log(savedStatus);
    localStorage.setItem('recipesStatus', JSON.stringify(savedStatus));
  }, [recipeId.id]);

  const checkRecipeDone = () => {
    const checkBoxes = [];
    const allIngredients = document.querySelectorAll('input');
    const doneButton = document.getElementById('done-recipe');
    console.log(doneButton);
    // console.log(allIngredients.every((item) => item.checked));
    // if (allIngredients.some((item) => item.checked === false)) return setRecipeCompleted(false);
    // return setRecipeCompleted(true);
    allIngredients.forEach((item) => checkBoxes.push(item.checked));
    return setRecipeCompleted(checkBoxes.every((item) => item === true));
    // return setRecipeCompleted(allIngredients.every((item) => item.checked === true));
  };
  const checkStatus = ({ target }) => {
    checkRecipeDone();
    // console.log(target.parentElement);
    if (target.checked) return target.parentElement.classList.add('checked');
    return target.parentElement.classList.remove('checked');
  };

  // const checkRecipeInProgress = () => {
  //   if (Object.keys(JSON.parse(localStorage.getItem('recipesStatus')))
  //     .some((item) => item === recipeId.id)) {
  //     setRecipeStarted(true);
  //     document.querySelector('.ingredients-checkbox')
  //       .innerHTML = JSON.parse(localStorage.getItem('recipesStatus'));
  //   }
  // };

  const renderDoneButton = () => (
    <Link to="/receitas-feitas">
      <button
        data-testid="finish-recipe-btn"
        className="done-recipe"
        type="button"
        disabled={ !recipeCompleted }
      >
        Finalizar receita
      </button>

    </Link>
  );

  if (!ingredients) return <span>Loading...</span>;

  return (
    <div className="ingredients-checkbox">
      { ingredients.map((item, index) => (
        <label
          htmlFor={ item }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          className="checkbox"
        >
          <input
            id={ item }
            type="checkbox"
            value={ item }
            name={ item }
            onClick={ (e) => checkStatus(e) }
          />
          { item }
        </label>
      ))}
      { renderDoneButton() }
    </div>
  );
}

IngredientsList.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsList;
