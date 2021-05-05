import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';
import { handleChecks } from '../actions/checks';
import '../Style/RecipeCheckboxes.css';

function RecipeListCheckboxes({ item, sendChecks, type, query }) {
  const INITIAL_STATE = () => {
    const obj = {};
    const max = true;
    let index = 1;
    while (max) {
      if (!item[`strIngredient${index}`]) return obj;
      obj[`strIngredient${index}`] = false;
      index += 1;
    }
  };
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const alreadyExists = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  )[type][item[`id${query}`]] || false;

  const [checkboxes, setCheckboxes] = useState(
    alreadyExists || INITIAL_STATE(),
  );

  const handleChanges = ({ target }) => {
    setCheckboxes({ ...checkboxes, [target.name]: target.checked });
    sendChecks({ ...checkboxes, [target.name]: target.checked });
  };

  useEffect(() => {
    const obj = {
      ...local,
      [type]: {
        ...local[type],
        [item[`id${query}`]]: checkboxes,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }, [checkboxes, item, type, local, query]);

  const setList = () => {
    const ingredients = [];
    const max = true;
    let index = 1;
    while (max) {
      if (!item[`strIngredient${index}`]) return ingredients;
      ingredients.push(
        <label
          htmlFor={ `strIngredient${index}` }
          data-testid={ `${index - 1}-ingredient-step` }
          className={ `${checkboxes[`strIngredient${index}`] && 'check'} checkbox path` }
          key={ index }
        >
          <input
            className="checkbox"
            type="checkbox"
            checked={ checkboxes[`strIngredient${index}`] }
            id={ `strIngredient${index}` }
            name={ `strIngredient${index}` }
            onChange={ handleChanges }
          />
          <svg viewBox="0 0 21 21">
            <path
              // eslint-disable-next-line max-len
              d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"
            />
          </svg>
          {`${item[`strIngredient${index}`]} - ${item[`strMeasure${index}`]}`}
        </label>,
      );
      index += 1;
    }
  };

  return (
    <div className="ingredientsList">
      <div className="checkboxList">
        { setList() }
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendChecks: (checks) => dispatch(handleChecks(checks)),
});

RecipeListCheckboxes.propTypes = {
  item: object,
}.isRequired;

export default connect(null, mapDispatchToProps)(RecipeListCheckboxes);
