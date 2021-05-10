import React, { useContext, useState } from 'react';
import { number, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../context';

export default function ButtonStart({ id, type }) {
  const {
    values: {
      inProgressRecipes: inProgRecContext,
    },
  } = useContext(RecipesContext);

  const [inProgressRecipes] = useState(
    inProgRecContext || { cocktails: {}, meals: {} },
  );

  const history = useHistory();

  function renderStartButtonText() {
    if (inProgressRecipes[type[2]]) {
      const recipes = inProgressRecipes[type[2]];
      return Object.keys(recipes).find((recipeID) => recipeID === id)
        ? 'Continuar Receita' : 'Iniciar Receita';
    }
    return 'Iniciar Receita';
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="details__button--start"
      onClick={ () => history.push(`/${type[0]}/${id}/in-progress`) }
    >
      { renderStartButtonText() }
    </button>
  );
}

ButtonStart.propTypes = {
  id: number,
  type: string,
}.isRequired;
