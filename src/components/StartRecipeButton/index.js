import React, { useContext, useState, useEffect } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

import {
  addRecipeInProgress,
  checkRecipesInProgress } from '../../services/inProgressRecipes';
import RecipesContext from '../../context/RecipesContext';
import './styles.css';

const StartRecipeButton = (props) => {
  const { pathname } = props;
  const { recipesType, changeRecipesType } = useContext(RecipesContext);
  const [inProgress, setProgress] = useState(false);
  const idRegex = new RegExp('[0-9]+');
  const id = pathname.match(idRegex)[0];

  useEffect(() => {
    changeRecipesType();
    checkRecipesInProgress(recipesType, id, setProgress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, recipesType]);

  return (
    <div>
      <Link to={ `${pathname}/in-progress` }>
        <button
          className="btnStart btn btn-primary btn-block"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => { if (!inProgress) addRecipeInProgress(recipesType, id); } }
        >
          { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </Link>
    </div>
  );
};

StartRecipeButton.propTypes = {
  pathname: string,
}.isRequired;

export default StartRecipeButton;
