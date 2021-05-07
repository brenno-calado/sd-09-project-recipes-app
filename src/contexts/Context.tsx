import React, { createContext, useState } from 'react';
import { MealServiceFirstLetterAPI, MealServiceIngredientsAPI, MealServiceNameAPI } from '../services/MealRecipesAPI';
import { BeverageServiceFirstLetterAPI, BeverageServiceIngredientsAPI, BeverageServiceNameAPI } from '../services/BeverageRecipesAPI';

interface ContextProviderData {
  children: React.ReactNode;
}

export const Context = createContext({});

export function ContextProvider({ children }: ContextProviderData) {
  const [ inputToSearch, setInputToSearch ] = useState('');
  const [ definedTypeSearch, setDefinedTypeSearch ] = useState('Meal');
  const [ filterSelected, setFilterSelected ] = useState('');
  const [ arrayOfResults, setArrayOfResults ] = useState([]);

  function characterLimiter() {
    return filterSelected === 'firstLetter' && inputToSearch.length > 1
    ? (alert('Sua busca deve conter somente 1 (um) caracter'),
      setInputToSearch(inputToSearch[0]))
    : (null);
  }

  // Função para buscar e retornar o array de resultados =======================================================

  async function searchInMealRecepies(mealToSearch:string) {
    if (filterSelected === 'firstLetter') {
      return setArrayOfResults(await MealServiceFirstLetterAPI(mealToSearch))
    };
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

  async function searchInBeverageRecepies(beverageToSearch:string) {
    if (filterSelected === 'firstLetter') {
      return setArrayOfResults(await BeverageServiceFirstLetterAPI(beverageToSearch))
    };
    return filterSelected === 'name'
      ? setArrayOfResults(await BeverageServiceNameAPI(beverageToSearch))
      : setArrayOfResults(await BeverageServiceIngredientsAPI(beverageToSearch));
  }

  async function submitInputToSearch(valueToSearch:string) {
    definedTypeSearch === 'Meal'
      ? await searchInMealRecepies(valueToSearch)
      : await searchInBeverageRecepies(valueToSearch);
  }

  // Renderizador dos resultados ============================================================================================

  function resultOfBeverages() {
    return arrayOfResults.length === 1
      ? (null)
      : arrayOfResults.map(({strDrink, idDrink, strDrinkThumb}) => (
        <section data-testid={ `${idDrink}-recipe-card` }>
          <img src={strDrinkThumb} data-testid={ `${idDrink}-card-img` } />
          <p data-testid={ `${idDrink}-card-name` } >{ strDrink }</p>
        </section>
      ));
  }
  function resultOfMeals() {
    return arrayOfResults.length === 1
      ? (null)
      : arrayOfResults.map(({strMeal, idMeal, strMealThumb}) => (
        <section data-testid={ `${idMeal}-recipe-card` }>
          <img src={strMealThumb} data-testid={ `${idMeal}-card-img` } />
          <p data-testid={ `${idMeal}-card-name` } >{ strMeal }</p>
        </section>
      ));
  }

  function returnOfResults() {
    if (arrayOfResults.length === 0) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    }
    return definedTypeSearch === 'Meal'
      ? resultOfMeals() : resultOfBeverages();
  }

  // =================================================================================================

  return (
    <Context.Provider
      value={{
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
        returnOfResults
      }}>
      { children }
    </Context.Provider>
  );
}
