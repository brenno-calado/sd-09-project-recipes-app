import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import apiFood from '../services/api';

export const FoodContext = createContext();

function ContextFoods(props) {
  const { children } = props;
  const [foodApi, setFoodApi] = useState([]);

  useEffect(() => {
    alert(apiFood);
  }, []);
}
