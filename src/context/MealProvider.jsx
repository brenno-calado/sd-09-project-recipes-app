import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MealContext from './MealContext';
import getMeals from '../services/MealFetch';

const MealProvider = ({ children }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(getMeals());
  }, []);

  const context = {
    data,
  };

  return (
    <MealContext.Provider value={ context }>
      { children }
    </MealContext.Provider>
  );
};

MealProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealProvider;
