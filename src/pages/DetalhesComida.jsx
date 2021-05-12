import React, { useEffect, useContext, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import MealContext from '../context/MealContext';
import Share from '../components/Share';
import Favorite from '../components/Favorite';
import StartBtn from '../components/StartBtn';
import Recomendations from '../components/Recomendations';
import { getMealById } from '../services/MealFetch';
import '../styles/recipes.css';

function DetalhesComida() {
  const [toProgress, setToProgress] = useState(false);
  const [doneRec, setDoneRec] = useState(false);
  const { recipeDt, setRecipeDt } = useContext(MealContext);
  const idReceita = useRouteMatch('/comidas/:id');
  const { id } = idReceita.params;
  let checkDone = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log('id da receita:', id);

  if (checkDone === null) {
    checkDone = [];
  }
  const done = checkDone.map((item) => item.id);

  function ingredientHELL(recipe) {
    const keys = Object.entries(recipe);
    const result = [];
    // console.log(keys);
    const filteredIng = keys.filter((key) => key[0].includes('strIngredient'));
    const filteredMeasures = keys.filter((key) => key[0].includes('strMeasure'));
    for (let i = 0; i < filteredIng.length; i += 1) {
      if (filteredIng[i][1] === '' || filteredIng[i][1] === null) {
        filteredIng.splice(i, 1);
        filteredMeasures.splice(i, 1);
        i -= 1;
      }
    }
    // console.log(filteredIng);
    // console.log(filteredMeasures);
    for (let i = 0; i < filteredIng.length; i += 1) {
      result.push(
        `${filteredIng[i][1]} - ${filteredMeasures[i][1]}`,
      );
    }
    // console.log(result);
    if (!result) return <div>loading</div>;

    return (
      result.map((ing, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { ing }
        </li>))
    );
  }

  function startHandler() {
    setToProgress(true);
  }

  function fetchMeal() {
    getMealById(id).then((meal) => setRecipeDt(meal));
  }

  useEffect(() => {
    fetchMeal();
    if (done.includes(id)) {
      setDoneRec(true);
    }
  }, []);

  // console.log('The recipe:', recipeDt);
  const favObj = {
    id: recipeDt.idMeal,
    type: 'comida',
    area: recipeDt.strArea,
    category: recipeDt.strCategory,
    alcoholicOrNot: '',
    name: recipeDt.strMeal,
    image: recipeDt.strMealThumb,
  };
  // console.log('Favorite Object', favObj);
  return (
    <div>

      { toProgress
        ? <Redirect to={ `/comidas/${recipeDt.idMeal}/in-progress` } />
        : null }

      <img
        data-testid="recipe-photo"
        src={ recipeDt.strMealThumb }
        alt="imagem da comida"
      />
      <h1 data-testid="recipe-title">{ recipeDt.strMeal }</h1>
      <Share />
      <Favorite recipe={ favObj } />
      <h3 data-testid="recipe-category">{ recipeDt.strCategory }</h3>
      <h2>Ingredientes:</h2>
      <ul>
        { ingredientHELL(recipeDt) }
      </ul>
      <p data-testid="instructions">
        { recipeDt.strInstructions }
      </p>

      <iframe
        data-testid="video"
        width="425"
        height="240"
        src="https:\/\/www.youtube.com\/embed?v=-mW1unsVhFU"
        title="Video"
      />
      <h2>Recomendações</h2>
      <Recomendations type="bebida" />
      {!doneRec && <StartBtn startHandler={ startHandler } route="/comidas/:id" />}
    </div>
  );
}

export default DetalhesComida;
