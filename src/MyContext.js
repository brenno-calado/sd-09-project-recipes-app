import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { searchByCategory, fetchToMainScreen } from './services/fetchAPI';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [showBar, setShowBar] = useState(false);
  const [resultAPI, setResultAPI] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieSelected, setCategorieSelected] = useState('');
  const [toggle, setToggle] = useState(false);

  const filterByCategory = ({ value }, typeFood) => {
    if (toggle && categorieSelected === value) {
      fetchToMainScreen(typeFood).then((result) => {
        setData(result);
        setToggle(false);
        setCategorieSelected(value);
      });
    } else {
      searchByCategory(value, typeFood)
        .then((result) => {
          setData(result);
          setToggle(true);
          setCategorieSelected(value);
        });
    }
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
