import React, { useState } from 'react';
import { Redirect } from 'react-router';
import CheckBoxProgress from '../components/CheckboxProgress';
// import { AppContext } from '../context/AppContext';
import mockDrink from '../context/mockInfo';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';

const ProgressoComidas = () => {
  const { strDrink,
    strCategory, strDrinkThumb, strInstructions, ingredientsAndMeasurements } = mockDrink;
  const [stepsFinished, setStepsFinished] = useState(1);
  const [redirect, setRedirect] = useState(false);
  let stepsLimit = 1;
  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareImg } alt="Compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartImg } alt="Favoritar" />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <div className="ingredient-steps">
        { ingredientsAndMeasurements.map((ingredient, index) => {
          stepsLimit += 1;
          return (
            <CheckBoxProgress
              ingredient={ ingredient }
              index={ index }
              key={ index }
              setStepsFinished={ setStepsFinished }
              stepsFinished={ stepsFinished }
            />);
        }) }
      </div>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ stepsFinished < stepsLimit }
        onClick={ () => setRedirect(true) }
      >
        Finalizar Receita
      </button>
      {redirect ? <Redirect to="/receitas-feitas" /> : null}
    </div>
  );
};

export default ProgressoComidas;
