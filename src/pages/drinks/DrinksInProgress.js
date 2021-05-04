import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { updateLocalStorage } from '../../services/localStorageService';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinksInProgress() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    getData();
  }, [id]);

  const checkBoxClick = ({ target }) => {
    target.parentElement.classList.toggle('selected');
    const allCheked = document.querySelectorAll('input[type=checkbox]');
    const ingredients = [];
    allCheked.forEach((checkbox) => {
      if (checkbox.checked) {
        ingredients.push(checkbox.parentElement.innerText);
      }
    });
    updateLocalStorage('inProgressRecipes', 'cocktails', id, ingredients);
    if (allCheked.length === ingredients.length) setDisableButton(false);
    else setDisableButton(true);
  };

  const handleClick = () => {
    const doneRecipe = {
      id,
      type: 'bebida',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: data.strTags ? data.strTags.split(',') : [],
    };
    updateLocalStorage('doneRecipes', 'doneRecipes', doneRecipe);
    setShouldRedirect(true);
  };

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      { ingredients.map((ingredient, index) => (
        data[ingredient] && data[ingredient].length ? (
          <label
            htmlFor={ ingredient }
            data-testid="ingredient-step"
            key={ ingredient }
          >
            { `${data[ingredient]} ${data[measures[index]]}` }
            <input
              data-testid={ `${index}-ingredient-name-and-measure` }
              id={ ingredient }
              value={ ingredient }
              type="checkbox"
              onClick={ checkBoxClick }
            />
          </label>) : false
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ handleClick }
        disabled={ disableButton }
      >
        Finalizar Receita
      </button>
    </section>
  );
}

export default DrinksInProgress;
