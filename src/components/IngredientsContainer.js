import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { Context } from '../context';
import { getItemLocalStorage, updateLocalStorage }
  from '../services/localStorageService';
import '../css/IngredientsContainer.css';

const addInputsCheckedInLocalStorage = (page, id, allCheked, setDisableButton) => {
  const ingredients = [];
  allCheked.forEach((checkbox) => {
    if (checkbox.checked) {
      ingredients.push(checkbox.parentElement.innerText);
    }
  });
  updateLocalStorage('inProgressRecipes', page, id, ingredients);
  if (allCheked.length === ingredients.length) setDisableButton(false);
  else setDisableButton(true);
};
function IngredientsContainer({ data }) {
  const { setDisableButton } = useContext(Context);
  const { id } = useParams();
  const { pathname } = useLocation();

  const page = pathname.includes('comidas') ? 'meals' : 'cocktails';

  const checkBoxClick = ({ target }) => {
    target.parentElement.classList.toggle('selected');
    const allCheked = document.querySelectorAll('input[type=checkbox]');
    addInputsCheckedInLocalStorage(page, id, allCheked, setDisableButton);
  };

  const ingredientsChecked = localStorage.inProgressRecipes
  && getItemLocalStorage('inProgressRecipes')[page][id];

  const defineIngredientChecked = (ingredient) => ingredientsChecked && ingredientsChecked
    .some((item) => item.includes(data[ingredient]));

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));

  return (
    <section className="wrapper-ingredients">
      <h3 className="title-section">Ingredientes</h3>
      { ingredients.map((ingredient, index) => (
        data[ingredient] && data[ingredient].length && (
          pathname.includes('in-progress') ? (
            <div className="container-checkboxs" key={ ingredient }>
              <label
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className={ `ingr-container ${index % 2 === 0 && 'bg-orange-100'}
                ${defineIngredientChecked(ingredient) ? 'selected' : null}` }
              >
                <input
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  id={ ingredient }
                  value={ ingredient }
                  type="checkbox"
                  onClick={ checkBoxClick }
                  defaultChecked={ defineIngredientChecked(ingredient) }
                  className="checkbox-input"
                />
                { `${data[ingredient]} ${data[measures[index]]}` }
              </label>
            </div>
          ) : (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
              className={ `ingr-container ${index % 2 === 0 && 'bg-orange-100'}` }
            >
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
