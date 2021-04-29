import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';
import { handleChecks } from '../actions/checks';

function RecipeList({ item, sendChecks, type, query }) {
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
          className={ checkboxes[`strIngredient${index}`] && 'check' }
        >
          <input
            className="check"
            type="checkbox"
            checked={ checkboxes[`strIngredient${index}`] }
            id={ `strIngredient${index}` }
            name={ `strIngredient${index}` }
            onChange={ handleChanges }
          />
          {`${item[`strIngredient${index}`]} - ${item[`strMeasure${index}`]}`}
        </label>,
      );
      index += 1;
    }
  };

  return (
    <div>
      { setList() }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendChecks: (checks) => dispatch(handleChecks(checks)),
});

RecipeList.propTypes = {
  item: object,
}.isRequired;

export default connect(null, mapDispatchToProps)(RecipeList);
