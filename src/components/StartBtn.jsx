import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export default function StartBtn(props) {
  const { route } = props;
  const idReceita = useRouteMatch(route);
  const { id } = idReceita.params;
  const { startHandler } = props;

  function btnRender() {
    let checkInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (checkInProgress === null) {
      checkInProgress = {
        cocktails: {},
        meals: {},
      };
    }

    // In Progress btn:
    let list;
    if (route === '/comidas/:id') {
      list = Object.keys(checkInProgress.meals);
    }

    if (route === '/bebidas/:id') {
      list = Object.keys(checkInProgress.cocktails);
    }

    if (list.includes(id)) {
      return (
        <div>
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ startHandler }
            className="start-button"
          >
            Continuar Receita
          </button>
        </div>
      );
    }

    return (
      <div>
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startHandler }
          className="start-button"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }

  return btnRender();
}
