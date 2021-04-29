import React, { createContext } from 'react';
import { useState } from 'react';
import { MealServiceIngredientsAPI, MealServiceNameAPI, MealServiceFirstLetterAPI } from '../services/MealRecipesAPI';
import { BeverageServiceIngredientsAPI, BeverageServiceNameAPI, BeverageServiceFirstLetterAPI } from '../services/BeverageRecipesAPI';
interface ContextProviderData {
  children: React.ReactNode;
}

export const Context = createContext({});

export function ContextProvider({ children }: ContextProviderData) {
  const [ inputToSearch, setInputToSearch ] = useState('');
  const [ definedTypeSearch, setDefinedTypeSearch ] = useState('meals');
  const [ filterSelected, setFilterSelected ] = useState('');
  const [ arrayOfResults, setArrayOfResults ] = useState('');

  function characterLimiter() {
    filterSelected === 'firstLetter' && inputToSearch.length > 1 ? alert('Sua busca deve conter somente 1 (um) caracter') : null;
  }

  async function searchInMealRecepies(mealToSearch:string) {
    if (filterSelected === 'firstLetter') {
      return setArrayOfResults(await MealServiceFirstLetterAPI(mealToSearch))
    };
    return filterSelected === 'name'
      ? setArrayOfResults(await MealServiceNameAPI(mealToSearch))
      : setArrayOfResults(await MealServiceIngredientsAPI(mealToSearch));
  }

  async function searchInBeverageRecepies(beverageToSearch:string) {
    if (filterSelected === 'firstLetter') {
      return setArrayOfResults(await BeverageServiceFirstLetterAPI(beverageToSearch))
    };
    return filterSelected === 'name'
      ? setArrayOfResults(await BeverageServiceNameAPI(beverageToSearch))
      : setArrayOfResults(await BeverageServiceIngredientsAPI(beverageToSearch));
  }

  function submitInputToSearch(valueToSearch:string) {
    definedTypeSearch === 'meals'
      ? searchInMealRecepies(valueToSearch)
      : searchInBeverageRecepies(valueToSearch);
  }

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
        submitInputToSearch
      }}>
      { children }
    </Context.Provider>
  );
}
