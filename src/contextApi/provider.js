import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AppContext from './context';
import RecipeCard from '../components/RecipeCard';
import { MealServiceFirstLetterAPI,
  MealServiceNameAPI,
  MealServiceIngredientsAPI } from '../services/MealRecipesAPI';
import { BeverageServiceFirstLetterAPI,
  BeverageServiceNameAPI,
  BeverageServiceIngredientsAPI } from '../services/BeverageRecipesAPI';

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

  function resultOfMeals(results) {
    const maxIndexRecipes = 11;
    if (results.length >= 1) {
      if (results.length === 1) {
        return (<Redirect to={ `/comidas/${results.idMeal}` } />);
      }
      results.map(({ strMeal, idMeal, strMealThumb }, index) => (
        index > maxIndexRecipes ? (null)
          : (
            <Link
              to={ `/bebidas/${idMeal}` }
              key={ strMeal }
            >
              <RecipeCard
                img={ strMealThumb }
                title={ strMeal }
                index={ index }
              />
            </Link>)
      ));
    }
  }

  function resultOfBeverages() {
    const maxIndexRecipes = 11;
    if (arrayOfResults.length >= 1) {
      if (arrayOfResults.length === 1) {
        return (<Redirect to={ `/bebidas/${arrayOfResults.idDrink}` } />);
      }
      arrayOfResults.map(({ strDrink, idDrink, strDrinkThumb }, index) => (
        index > maxIndexRecipes ? (null)
          : (
            <Link
              to={ `/bebidas/${idDrink}` }
              key={ strDrink }
            >
              <RecipeCard
                img={ strDrinkThumb }
                title={ strDrink }
                index={ index }
              />
            </Link>)
      ));
    }
  }

  function returnOfResults() {
    if (arrayOfResults.length === 0) {
      return Window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return definedTypeSearch === 'Meal'
      ? resultOfMeals() : resultOfBeverages();
  }

  const hide = { display: 'none' };
  const [hideOrUnhide, setHideOrUnhide] = useState(hide);

  function hideSearchBar() {
    return hideOrUnhide.display === 'none'
      ? setHideOrUnhide({ display: 'flex', flexDirection: 'column' })
      : setHideOrUnhide(hide);
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
        arrayOfResults,
        setArrayOfResults,
        submitInputToSearch,
        returnOfResults,
        setBeverages,
        setMeals,
        hideOrUnhide,
        setHideOrUnhide,
        hideSearchBar,
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
