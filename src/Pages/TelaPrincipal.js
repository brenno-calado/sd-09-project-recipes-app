import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';
import MenuInferior from '../components/MenuInferior';
import { MyContext } from '../MyContext';
import { fetchToMainScreen, categoriesList } from '../services/fetchAPI';

export default function TelaPrincipal() {
  const { pathname } = useLocation();
  const {
    isLoading,
    setIsLoading,
    setData,
    setCategories,
  } = useContext(MyContext);

  const [firstFetch, setFirstFetch] = useState(false);
  const [secondFetch, setSecondFetch] = useState(false);

  useEffect(() => {
    fetchToMainScreen(pathname).then((result) => {
      setData(result);
      setFirstFetch(true);
    });
    categoriesList(pathname).then((result) => {
      setCategories(result);
      setSecondFetch(true);
    });
    if (firstFetch && secondFetch) {
      setIsLoading(false);
    }
  }, [setIsLoading, setData, pathname, setCategories, firstFetch, secondFetch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {pathname === '/comidas' ? <MealCard /> : <DrinkCard /> }
      <MenuInferior />
    </div>
  );
}
