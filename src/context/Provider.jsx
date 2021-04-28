import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function Provider(props) {
  const [filter, setFilter] = useState('');
  const [inputText, setInputText] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState({ meals: false, drinks: false });

  const handleClick = (e) => {
    const { target } = e;
    setFilter(target.value);
  };

  const handleChange = (e) => {
    const { target } = e;
    setInputText(target.value);
  };

  const displayAlert = () => {
    alert('Sua busca deve conter somente 1 (um) caracter');
  };

  const verifyMealsQuantity = (meals) => {
    if (meals && meals.length === 1) {
      setShouldRedirect({ meals: true });
    }
  };
  const verifyDrinksQuantity = (drinks) => {
    if (drinks && drinks.length === 1) {
      setShouldRedirect({ drinks: true });
    }
  };

  const itShouldRedirect = (drinks, meals) => {
    if (shouldRedirect.meals) {
      const { idMeal } = meals[0];
      setShouldRedirect({ meals: false });
      window.location.replace(`/comidas/${idMeal}`);
    }

    if (shouldRedirect.drinks) {
      const { idDrink } = drinks[0];
      setShouldRedirect({ drinks: false });
      console.log(idDrink);
      window.location.replace(`/bebidas/${idDrink}`);
    }
  };

  const handleSearch = (value, filterMeals, filterDrinks) => {
    // const { value } = props;
    // console.log(value);
    switch (value) {
    case 'comidas':
      return filterMeals();
    case 'bebidas':
      return filterDrinks();
    default:
    }
  };

  const context = {
    filter,
    inputText,
    setFilter,
    handleClick,
    handleChange,
    displayAlert,
    shouldRedirect,
    setShouldRedirect,
    verifyMealsQuantity,
    verifyDrinksQuantity,
    handleSearch,
    itShouldRedirect,
  };

  const { children } = props;
  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

export default Provider;
