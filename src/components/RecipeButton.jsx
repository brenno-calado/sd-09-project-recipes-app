import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeButton({ path, ingredients }) {
  const [buttonName, setButtonName] = useState('Iniciar Receita');
  const numberSlice = 9;

  function createLocalStorage() {
    const inProgressRecipes = 'inProgressRecipes';
    if (localStorage[inProgressRecipes] === undefined) {
      const obj = {
        cocktails: {
        },
        meals: {
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  }

  function alimentProgress() {
    const ingredient = ingredients.map((i) => i[1]);
    if (path.includes('/comidas')) {
      const id = path.slice(numberSlice);
      let include = JSON.parse(localStorage.getItem('inProgressRecipes'));
      include = {
        ...include,
        meals: {
          ...include.meals, [id]: ingredient,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(include));
    } else {
      const id = path.slice(numberSlice);
      let include = JSON.parse(localStorage.getItem('inProgressRecipes'));
      include = {
        ...include,
        cocktails: {
          ...include.cocktails, [id]: ingredient,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(include));
    }
  }

  function nameOfButton() {
    const id = path.slice(numberSlice);
    const include = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (path.includes('/comida')) {
      if (include.meals[id] !== undefined) setButtonName('Continuar Receita');
    } else {
      return include.cocktails[id] !== undefined
        ? setButtonName('Continuar Receita')
        : setButtonName('Iniciar Receita');
    }
  }

  useEffect(() => {
    createLocalStorage();
    nameOfButton();
  });

  return (
    <Link to={ `${path}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed"
        onClick={ alimentProgress }
      >
        { buttonName }
      </button>
    </Link>
  );
}

RecipeButton.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.string.isRequired,
};

export default RecipeButton;
