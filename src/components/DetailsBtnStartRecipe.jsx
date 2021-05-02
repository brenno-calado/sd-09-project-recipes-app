import React, { useEffect, useState } from 'react';
import './DetailsBtnStartRecipe.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { getIdFromURL } from '../services/others';

function DetailsBtnStartRecipe() {
  const [buttonName, setButtonName] = useState('Iniciar Receita');
  const [buttonClassName, setButtonClassName] = useState('');
  const [recipeIsDone, setRecipeIsDone] = useState(false);
  const [recipeIsInProgress, setRecipeIsInProgress] = useState(false);
  const [redirect, setRedirect] = useState('');

  function checkRecipeStatus() {
    const allRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const allRecipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const actualId = getIdFromURL();

    // in allRecipesDone, find and set the state of recipe if is found in done list
    let foundInDone;
    if (allRecipesDone) {
      foundInDone = allRecipesDone.find((recipes) => recipes.id === actualId);
      if (foundInDone) { setRecipeIsDone(true); }
    }

    // in allRecipesInProgress, is created two arrays of keys and find it on meals or drinks by his id
    let foundCocktailsInProgress;
    let foundMealsInProgress;
    if (allRecipesInProgress) {
      foundCocktailsInProgress = Object
        .keys(allRecipesInProgress.cocktails)
        .find((key) => key === actualId);
      foundMealsInProgress = Object
        .keys(allRecipesInProgress.meals)
        .find((key) => key === actualId);
    }
    if (foundCocktailsInProgress || foundMealsInProgress) {
      setRecipeIsInProgress(true);
    }
  }

  function handleRecipeStartOrContinue() {
    if (recipeIsInProgress) {
      const thisPath = window.location.path;
      setRedirect(<Redirect to={ `${thisPath}/in-progress` } />);
      console.log('OLA NUB'); // continuar aqui
    }
  }

  useEffect(() => {
    function verifyRecipeIsDoneAndHide() {
      if (recipeIsDone) {
        setButtonClassName('hidden');
      }
    }

    function verifyRecipeIsInProgressAndChangeBtnName() {
      if (recipeIsInProgress) { setButtonName('Continuar Receita'); }
    }

    checkRecipeStatus();
    verifyRecipeIsDoneAndHide();
    verifyRecipeIsInProgressAndChangeBtnName();
    console.log('SOU USEEFFECT');
  }, [recipeIsDone, recipeIsInProgress]);

  const detailsButton = (
    <Button
      type="button"
      data-testid="start-recipe-btn"
      color="primary"
      className={ `btnFixed ${buttonClassName}` }
      onClick={ handleRecipeStartOrContinue }
    >
      {buttonName}
    </Button>
  );

  console.log('rodei - detailsbtnstartrecipe');

  // ---------------------------------------------------------------
  function imprimirbtn() {
    console.log(buttonName, buttonClassName);
    console.log(detailsButton);
  }

  function addLocalInProgress() {
    const obj = {
      cocktails: {
        idbebida1: ['lista-de-ingredientes-utilizados1'],
        11002: ['lista-de-ingredientes-utilizados2'],
      },
      meals: {
        idcomida1: ['lista-de-ingredientes-utilizados3'],
        52772: ['lista-de-ingredientes-utilizados4'],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }

  function addLocalDone() {
    const obj = [{
      id: '11004',
      type: 'comida-ou-bebida',
      area: 'area-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: 'array-de-tags-da-receita-ou-array-vazio',
    },
    {
      id: '52774',
      type: 'comida-ou-bebida',
      area: 'area-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: 'array-de-tags-da-receita-ou-array-vazio',
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(obj));
  }

  return (
    <div>
      {detailsButton}
      {redirect}
      <button type="button" onClick={ addLocalInProgress }>ADDLOCAL-INPROGRESS</button>
      <button type="button" onClick={ addLocalDone }>ADDLOCAL-DONERECIPES</button>
      <button type="button" onClick={ imprimirbtn }>LOG do BUTTON</button>
    </div>
  );
}

DetailsBtnStartRecipe.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default DetailsBtnStartRecipe;
