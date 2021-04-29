import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDrinks, listMeals } from '../actions';
import CardContainer from '../components/cardContainer';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function MainPageFood() {
  const { pathname } = window.location;
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchs = async () => {
      const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');
      const fetchDrinks = await getFoodsAndDrinks('drinks', 'getAll');

      dispatch(listMeals(fetchMeals));
      dispatch(listDrinks(fetchDrinks));
    };

    dispatchFetchs();
  }, []);

  const recipesData = useSelector((state) => {
    if (pathname === '/comidas') return state.recipesReducer.meals;
    if (pathname === '/bebidas') return state.recipesReducer.drinks;
  });

  useEffect(() => {
    setRecipes(recipesData);
  }, [recipesData]);

  return (
    <>
      <header className="header-wrapper">{pathname.replace('/', '')}</header>
      <main className="mainPage-wrapper">
        <CardContainer recipes={ recipes } path={ pathname } />
      </main>
      <footer className="footer-wrapper">Footer</footer>
    </>
  );
}
