import React, { useEffect, useContext } from 'react';
import fetchApi from '../../services/index';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ListIngredientsCards from '../../components/ListIngredientsCards';
import { context } from '../../context';

export default function ExploreFoodIngredients() {
  const { foods, setFoods } = useContext(context);

  useEffect(() => {
    const lengthOfList = 12;
    fetchApi('food', 'ingredientsList', '').then((res) => {
      const fetchFoods = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfList);
      setFoods(fetchFoods);
    });
  }, [setFoods]);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        <ListIngredientsCards items={ foods } />
      </div>
      <Footer />
    </>
  );
}
