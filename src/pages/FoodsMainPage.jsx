import React, { useContext } from 'react';
import FoodsList from '../components/FoodsList';
import RecipesContext from '../Provider/RecipesContext';

function FoodsMainPage() {
  const { fetchingFoods } = useContext(RecipesContext);

  if (fetchingFoods) return <h1>Loading...</h1>;
  return (
    <div>
      <FoodsList />
    </div>
  );
}

export default FoodsMainPage;
