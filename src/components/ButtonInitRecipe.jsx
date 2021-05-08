import { string } from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AppContext from '../contextApi/context';

const ButtonInitRecipe = ({ type }) => {
  const { doneRecipes, recipesInProgress } = useContext(AppContext);
  const [isDone, setIsDoneStatus] = useState(false);
  const [isInProgress, setIsInProgressStatus] = useState(false);
  const [typeRecipe] = useState(() => {
    if (window.location.href.includes('comidas')) return 'comidas';
    if (window.location.href.includes('bebidas')) return 'bebidas';
  });
  const { id } = useParams();

  useEffect(() => {
    if (doneRecipes.find((done) => done.id === id)) {
      setIsDoneStatus(true);
    } else {
      setIsDoneStatus(false);
    }
  }, [doneRecipes, id]);

  useEffect(() => {
    if (recipesInProgress[type] && Object.keys(recipesInProgress[type])
      .find((inProgress) => inProgress === id)) {
      setIsInProgressStatus(true);
    } else {
      setIsInProgressStatus(false);
    }
  }, [id, recipesInProgress, type]);

  return (
    <div>
      { !isDone && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button-init-recipe"
        >
          <Link to={ `/${typeRecipe}/${id}/in-progress` }>
            { isInProgress ? 'Continuar ' : 'Iniciar ' }
            Receita
          </Link>
        </button>)}
    </div>
  );
};

ButtonInitRecipe.propTypes = {
  type: string,
}.isRequired;

export default ButtonInitRecipe;
