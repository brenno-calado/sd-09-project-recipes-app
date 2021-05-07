import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMealsById, fetchDrinkById, setDoneStorage } from '../services/index';
import { filterIngredients, saveDoneRecipes } from '../services/recipes';

function IngredientsList({ id, type }) {
  const recipeId = useParams();
  const [ingredients, setIngredients] = useState();
  const [currentRecipe, setCurrentRecipe] = useState();
  const [recipeCompleted, setRecipeCompleted] = useState(false);
  const [checkedIng, setCheckedIng] = useState(JSON.parse(localStorage
    .getItem('recipesStatus'))[recipeId.id] || []);
  // const [recipeStarted, setRecipeStarted] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeDetails = type === 'meals'
        ? await fetchMealsById(id) : await fetchDrinkById(id);
      // const recipeIngredients = recipeDetails && filterIngredients(recipeDetails);
      // console.log(recipeIngredients);
      return setCurrentRecipe(recipeDetails);
    };
    setDoneStorage();
    fetchRecipe();
  }, [id, type]);

  useEffect(() => {
    if (currentRecipe) setIngredients(filterIngredients(currentRecipe[0]));
  }, [currentRecipe]);

  useEffect(() => {
    // const recipeId = currentRecipe.strMeal || currentRecipe.strDrink;
    const statusStorage = JSON.parse(localStorage.getItem('recipesStatus'));
    const savedStatus = {
      ...statusStorage,
      [recipeId.id]: checkedIng,
    };
    console.log(checkedIng);
    localStorage.setItem('recipesStatus', JSON.stringify(savedStatus));
  }, [checkedIng, recipeId.id]);

  const checkRecipeDone = () => {
    // const checkBoxes = [];
    const allIngredients = Array.from(document.querySelectorAll('input'));
    // const doneButton = document.getElementById('done-recipe');
    // console.log(doneButton);
    // console.log(allIngredients.every((item) => item.checked));
    // if (allIngredients.some((item) => item.checked === false)) return setRecipeCompleted(false);
    // return setRecipeCompleted(true);
    // allIngredients.forEach((item) => checkBoxes.push(item.checked));
    const checkedlist = allIngredients.map((item) => item.checked);
    // console.log(checkedlist);
    setCheckedIng(checkedlist);
    setRecipeCompleted(allIngredients.every((item) => item.checked === true));
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
  //     console.log('check true');
  //     return true;
  //   }
  //   console.log('recipe not in storage');
  // };

  const renderDoneButton = () => (
    <Link to="/receitas-feitas">
      <button
        data-testid="finish-recipe-btn"
        className="done-recipe"
        type="button"
        disabled={ !recipeCompleted }
        onClick={ () => saveDoneRecipes(recipeId.id) }
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
            checked={ checkedIng[index] || false }
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
