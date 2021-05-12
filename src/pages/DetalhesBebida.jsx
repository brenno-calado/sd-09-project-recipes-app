import React, { useEffect, useContext, useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import MealContext from '../context/MealContext';
import Share from '../components/Share';
import Favorite from '../components/Favorite';
import StartBtn from '../components/StartBtn';
import Recomendations from '../components/Recomendations';
import { getDrinkById } from '../services/DrinkFetch';
import '../styles/recipes.css';

function DetalhesBebida() {
  const [toProgress, setToProgress] = useState(false);
  const [doneRec, setDoneRec] = useState(false);
  const { recipeDt, setRecipeDt } = useContext(MealContext);
  const idReceita = useRouteMatch('/bebidas/:id');
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
    // console.log('Primary information:', keys);
    const filteredIng = keys.filter((key) => key[0].includes('strIngredient'));
    const filteredMeasures = keys.filter((key) => key[0].includes('strMeasure'));
    for (let i = 0; i < filteredIng.length; i += 1) {
      if (filteredIng[i][1] === '' || filteredIng[i][1] === null) {
        filteredIng.splice(i, 1);
        filteredMeasures.splice(i, 1);
        i -= 1;
      }
    }
    // console.log('Filtered ingredients:', filteredIng);
    // console.log('Filtered Measures:', filteredMeasures);
    for (let i = 0; i < filteredIng.length; i += 1) {
      result.push(
        `${filteredIng[i][1]} - ${filteredMeasures[i][1]}`,
      );
    }
    // console.log('Arranged results:', result);
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

  function fetchDrink() {
    getDrinkById(id).then((drink) => setRecipeDt(drink));
    console.log('Drink detail:', recipeDt);
  }

  useEffect(() => {
    fetchDrink();
    if (done.includes(id)) {
      setDoneRec(true);
    }
  }, []);

  // console.log('The recipe:', recipeDt);

  const favObj = {
    id: recipeDt.idDrink,
    type: 'bebida',
    area: '',
    category: recipeDt.strCategory,
    alcoholicOrNot: recipeDt.strAlcoholic,
    name: recipeDt.strDrink,
    image: recipeDt.strDrinkThumb,
  };

  return (
    <div>

      { toProgress
        ? <Redirect to={ `/bebidas/${recipeDt.idDrink}/in-progress` } />
        : null }

      <img
        data-testid="recipe-photo"
        src={ recipeDt.strDrinkThumb }
        alt="imagem da bebida"
      />
      <h1 data-testid="recipe-title">{ recipeDt.strDrink }</h1>
      <Share />
      <Favorite recipe={ favObj } />
      <h3 data-testid="recipe-category">{ recipeDt.strAlcoholic }</h3>
      <h3 data-testid="recipe-category">{ recipeDt.strCategory }</h3>
      <h2>Ingredientes:</h2>
      { ingredientHELL(recipeDt) }
      <p data-testid="instructions">
        { recipeDt.strInstructions }
      </p>
      <h2>Recomendações</h2>
      <Recomendations type="comida" />
      {!doneRec && <StartBtn startHandler={ startHandler } route="/bebidas/:id" />}
    </div>
  );
}

export default DetalhesBebida;
