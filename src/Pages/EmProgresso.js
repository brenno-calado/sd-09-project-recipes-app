import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import ProgressMeal from '../components/ProgressMeal';
import ProgressDrink from '../components/ProgressDrink';
import { MyContext } from '../MyContext';
import { mealAPI, drinkAPI } from '../services/fetchAPI';

function EmProgresso() {
  const { setData, setIsLoading, isLoading } = useContext(MyContext);
  const { pathname } = useLocation();

  const idRecipe = pathname.split('/')[2];

  const mealURL = pathname.includes('comidas');
  const drinkURL = pathname.includes('bebidas');

  useEffect(() => {
    if (mealURL) {
      mealAPI('id', idRecipe).then((result) => {
        setData(result);
        setIsLoading(false);
      });
    }
    if (drinkURL) {
      drinkAPI('id', idRecipe).then((result) => {
        setData(result);
        setIsLoading(false);
      });
    }
  }, [idRecipe, setData, setIsLoading, drinkURL, mealURL]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    (mealURL ? <ProgressMeal /> : <ProgressDrink />)
  );
}

export default EmProgresso;
