import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { MyContext } from '../MyContext';
import { mealAPI, drinkAPI } from '../services/fetchAPI';

export default function Detalhes() {
  const { pathname } = useLocation();
  const recipeId = pathname.substring(pathname.lastIndexOf('/') + 1);
  const { data, setData, isLoading,
    setIsLoading } = useContext(MyContext);

  useEffect(() => {
    if (pathname.includes('comidas')) {
      mealAPI('id', recipeId).then((result) => {
        setData(result);
        setIsLoading(false);
      });
    } else if (pathname.includes('bebidas')) {
      drinkAPI('id', recipeId).then((result) => {
        setData(result);
        setIsLoading(false);
      });
    }
  }, [setIsLoading, setData, pathname, recipeId, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <h1>Tela de detalhes</h1>
  );
}
