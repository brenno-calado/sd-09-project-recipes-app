import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesDrinks, categoriesMeals, listDrinks, listMeals } from '../actions';
import CardContainer from '../components/cardContainer';
import Categories from '../components/categories';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function MainPageFood() {
  const { pathname } = window.location;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchs = async () => {
      const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');
      const fetchDrinks = await getFoodsAndDrinks('drinks', 'getAll');

      dispatch(listMeals(fetchMeals));
      dispatch(listDrinks(fetchDrinks));

      const fetchCategoriesMeals = await getFoodsAndDrinks('meals', 'getByCategory');
      const fetchCategoriesDrinks = await getFoodsAndDrinks('drinks', 'getByCategory');

      dispatch(categoriesMeals(fetchCategoriesMeals));
      dispatch(categoriesDrinks(fetchCategoriesDrinks));
    };

    dispatchFetchs();
  }, []);

  const recipesData = useSelector((state) => {
    if (pathname === '/comidas') return state.recipesReducer.meals;
    if (pathname === '/bebidas') return state.recipesReducer.drinks;
  });

  const categoriesData = useSelector((state) => {
    if (pathname === '/comidas') return state.recipesReducer.categoriesMeals;
    if (pathname === '/bebidas') return state.recipesReducer.categoriesDrinks;
  });

  useEffect(() => {
    setRecipes(recipesData);
    setCategories(categoriesData);
  }, [categoriesData, recipesData]);

  return (
    <>
      <header className="header-wrapper">{pathname.replace('/', '')}</header>
      <main className="mainPage-wrapper">
        <Categories categories={ categories } path={ pathname } />
        <CardContainer recipes={ recipes } path={ pathname } />
      </main>
      <footer className="footer-wrapper">Footer</footer>
    </>
  );
}
