import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { Context } from '../context';
import { getItemLocalStorage, updateLocalStorage }
  from '../services/localStorageService';

function IngredientsContainer({ data }) {
  const { setDisableButton } = useContext(Context);
  const { id } = useParams();
  const { pathname } = useLocation();

  const page = pathname.includes('comidas') ? 'meals' : 'cocktails';

  const checkBoxClick = ({ target }) => {
    target.parentElement.classList.toggle('selected');
    const allCheked = document.querySelectorAll('input[type=checkbox]');
    const ingredients = [];
    allCheked.forEach((checkbox) => {
      if (checkbox.checked) {
        ingredients.push(checkbox.parentElement.innerText);
      }
    });
    updateLocalStorage('inProgressRecipes', page, id, ingredients);
    if (allCheked.length === ingredients.length) setDisableButton(false);
  };

  const ingredientsChecked = localStorage.inProgressRecipes
  && getItemLocalStorage('inProgressRecipes')[page][id];

  const defineIngredientChecked = (ingredient) => ingredientsChecked && ingredientsChecked
    .some((item) => item.includes(data[ingredient]));

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));

  return (
    <section>
      { ingredients.map((ingredient, index) => (
        data[ingredient] && data[ingredient].length && (
          pathname.includes('in-progress') ? (
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              key={ ingredient }
              className={ defineIngredientChecked(ingredient) ? 'selected' : null }
            >
              { `${data[ingredient]} ${data[measures[index]]}` }
              <input
                data-testid={ `${index}-ingredient-name-and-measure` }
                id={ ingredient }
                value={ ingredient }
                type="checkbox"
                onClick={ checkBoxClick }
                defaultChecked={ defineIngredientChecked(ingredient) }
              />
            </label>
          ) : (
            <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
              { data[ingredient] && `${data[ingredient]} ${data[measures[index]]}` }
            </p>))
      )) }
    </section>
  );
}

IngredientsContainer.propTypes = {
  data: shape({
    strIngredient: string,
    strMeasure: string,
  }),
  page: string,
}.isRequeried;

export default IngredientsContainer;
