import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './context';
import { MealServiceFirstLetterAPI,
  MealServiceIngredientsAPI,
  MealServiceNameAPI } from '../services/MealRecipesAPI';
import { BeverageServiceFirstLetterAPI,
  BeverageServiceIngredientsAPI,
  BeverageServiceNameAPI } from '../services/BeverageRecipesAPI';

const Provider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) setFavoriteRecipes(favorites);
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (done) {
      console.log(done);
      setDoneRecipes(done);
    }
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) setRecipesInProgress(inProgress);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavorites = (recipe, typeRecipe, id) => {
    const newFavorite = {
      id,
      type: typeRecipe[1],
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${typeRecipe[2]}`],
      image: recipe[`str${typeRecipe[2]}Thumb`],
    };
    if (favoriteRecipes
      .find((favorite) => favorite.id === newFavorite.id)) {
      setFavoriteRecipes(favoriteRecipes
        .filter((favorite) => favorite.id !== newFavorite.id));
    } else {
      setFavoriteRecipes([...favoriteRecipes, newFavorite]);
    }
  };

  const handleDoneRecipes = (recipe, typeRecipe, id) => {
    const newDone = {
      id,
      type: typeRecipe[1],
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${typeRecipe[2]}`],
      image: recipe[`str${typeRecipe[2]}Thumb`],
    };
    if (!doneRecipes.find((done) => done.id === id)) {
      setDoneRecipes([...doneRecipes, newDone]);
    }
  };

  const getIngredients = (recipe) => {
    let newIngredients = [];
    if (recipe) {
      Object.keys(recipe).forEach((item) => {
        if (item.includes('strIngredient') && recipe[item]) {
          newIngredients = [
            ...newIngredients,
            recipe[item],
          ];
        }
      });
      return newIngredients;
    }
  };

  const getMeasures = (recipe) => {
    let newMeasures = [];
    if (recipe) {
      Object.keys(recipe).forEach((item) => {
        if (item.includes('strMeasure') && recipe[item]) {
          newMeasures = [
            ...newMeasures,
            recipe[item],
          ];
        }
      });
      return newMeasures;
    }
  };

  const [inputToSearch, setInputToSearch] = useState('');
  const [definedTypeSearch, setDefinedTypeSearch] = useState('Meal');
  const [filterSelected, setFilterSelected] = useState('');
  const [arrayOfResults, setArrayOfResults] = useState([]);

  function characterLimiter() {
    return filterSelected === 'firstLetter' && inputToSearch.length > 1
      ? (Window.alert('Sua busca deve conter somente 1 (um) caracter'),
      setInputToSearch(inputToSearch[0]))
      : (null);
  }

  function setBeverages() {
    setDefinedTypeSearch('Beverage');
  }

  function setMeals() {
    setDefinedTypeSearch('Meal');
  }

  // Função para buscar e retornar o array de resultados =======================================================

  async function searchInMealRecepies(mealToSearch) {
    if (filterSelected === 'firstLetter') {
      return setArrayOfResults(await MealServiceFirstLetterAPI(mealToSearch));
    }
    return filterSelected === 'name'
      ? setArrayOfResults(await MealServiceNameAPI(mealToSearch))
      : setArrayOfResults(await MealServiceIngredientsAPI(mealToSearch));
  }

  // async function searchRecepies(valueToSearch:string) {
  //   if (filterSelected === 'firstLetter') {
  //     return setArrayOfResults(await `${definedTypeSearch}ServiceFirstLetterAPI(${valueToSearch})`)
  //   };
  //   return filterSelected === 'name'
  //     ? setArrayOfResults(await `${definedTypeSearch}ServiceNameAPI(${valueToSearch})`)
  //     : setArrayOfResults(await `${definedTypeSearch}ServiceIngredientsAPI(${valueToSearch})`);
  // }

  async function searchInBeverageRecepies(beverageToSearch) {
    if (filterSelected === 'firstLetter') {
      return setArrayOfResults(await BeverageServiceFirstLetterAPI(beverageToSearch));
    }
    return filterSelected === 'name'
      ? setArrayOfResults(await BeverageServiceNameAPI(beverageToSearch))
      : setArrayOfResults(await BeverageServiceIngredientsAPI(beverageToSearch));
  }

  async function submitInputToSearch(valueToSearch) {
    return await definedTypeSearch === 'Meal'
      ? searchInMealRecepies(valueToSearch)
      : searchInBeverageRecepies(valueToSearch);
  }

  // Renderizador dos resultados ============================================================================================

  function resultOfBeverages() {
    return arrayOfResults.length === 1
      ? (null)
      : arrayOfResults.map(({ strDrink, idDrink, strDrinkThumb }) => (
        <section key={ idDrink } data-testid={ `${idDrink}-recipe-card` }>
          <img
            src={ strDrinkThumb }
            data-testid={ `${idDrink}-card-img` }
            alt={ `${strDrink}` }
          />
          <p data-testid={ `${idDrink}-card-name` }>{ strDrink }</p>
        </section>
      ));
  }
  function resultOfMeals() {
    return arrayOfResults.length === 1
      ? (null)
      : arrayOfResults.map(({ strMeal, idMeal, strMealThumb }) => (
        <section key={ idMeal } data-testid={ `${idMeal}-recipe-card` }>
          <img
            src={ strMealThumb }
            data-testid={ `${idMeal}-card-img` }
            alt={ `${strMeal}` }
          />
          <p data-testid={ `${idMeal}-card-name` }>{ strMeal }</p>
        </section>
      ));
  }

  function returnOfResults() {
    if (arrayOfResults.length === 0) {
      return Window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return definedTypeSearch === 'Meal'
      ? resultOfMeals() : resultOfBeverages();
  }

  return (
    <AppContext.Provider
      value={ {
        getIngredients,
        getMeasures,
        favoriteRecipes,
        handleFavorites,
        doneRecipes,
        handleDoneRecipes,
        recipesInProgress,
        inputToSearch,
        setInputToSearch,
        definedTypeSearch,
        setDefinedTypeSearch,
        filterSelected,
        setFilterSelected,
        characterLimiter,
        arrayOfResults,
        setArrayOfResults,
        submitInputToSearch,
        returnOfResults,
        setBeverages,
        setMeals,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
