import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import apiDrink from '../services/api';

export const DrinkContext = createContext();

function ContextDrinks(props) {
  const { children } = props;
  const [drinkApi, setDrinkApi] = useState([]);

  useEffect(() => {
    alert(apiDrink);
  }, []);
}
