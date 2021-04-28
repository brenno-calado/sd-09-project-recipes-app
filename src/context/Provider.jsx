import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

  const verifyMealsQuantity = (rangos) => {
    if (rangos && rangos.length === 1) {
      setShouldRedirect({ meals: true, drinks: false });
      console.log('mehals');
    }
  };
  const verifyDrinksQuantity = (golos) => {
    if (golos && golos.length === 1) {
      setShouldRedirect({ meals: false, drinks: true });
      console.log('golos');
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
    // itShouldRedirect,
  };

  const { children } = props;
  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
