import React, { useState, useEffect } from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import {
  getDrinksAll,
  getDrinksByCategory,
  getDrinksCategories,
} from '../services/drinksAPI';
import RecipeCard from '../components/RecipeCard';
import FilterButtons from '../components/FilterButtons';

const Drinks = () => {
  const [drinks, setDrinks] = useState({ drinksList: [], isFetching: false });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');

  const requestDrinks = async () => {
    try {
      setDrinks({ ...drinks, isFetching: true });
      const drinksObject = category === 'All'
        ? await getDrinksAll()
        : await getDrinksByCategory(category);
      const drinksList = drinksObject.drinks;
      const listSize = 12;
      setDrinks({
        drinksList: drinksList.slice(0, listSize),
        isFetching: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const requestCategories = async () => {
    try {
      const drinksCategories = await getDrinksCategories();
      const categoriesSize = 5;
      const categoiesList = drinksCategories.drinks;
      setCategories(categoiesList.slice(0, categoriesSize));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestDrinks();
  }, [category]);

  useEffect(() => {
    requestCategories();
  }, []);

  const handleFilter = (filterName) => (
    filterName !== 'All' && category !== filterName
      ? setCategory(filterName)
      : setCategory('All'));

  return (
    <div>
      <Header title="Bebidas" />
      {categories && (
        <FilterButtons categories={ categories } handleFilter={ handleFilter } />
      )}
      {drinks.isFetching ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          {drinks.drinksList.map((drink, index) => (
            <RecipeCard
              key={ drink.idDrink }
              recipeName={ drink.strDrink }
              recipeImage={ drink.strDrinkThumb }
              index={ index }
            />
          ))}
        </div>
      )}
      <Menu />
    </div>
  );
};

export default Drinks;
