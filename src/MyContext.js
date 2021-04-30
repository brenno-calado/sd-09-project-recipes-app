import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { searchByCategory } from './services/fetchAPI';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [showBar, setShowBar] = useState(false);
  const [resultAPI, setResultAPI] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const filterByCategory = ({ value }, typeFood) => {
    searchByCategory(value, typeFood)
      .then((result) => setData(result));
  };

  const clickShowBar = () => {
    if (showBar) {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
    // (showBar ? setShowBar(false) : setShowBar(true))
  };

  const context = {
    data,
    categories,
    showBar,
    clickShowBar,
    resultAPI,
    setResultAPI,
    isLoading,
    setIsLoading,
    setData,
    setCategories,
    setShowBar,
    filterByCategory,
  };
  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyContext, MyContextProvider };
