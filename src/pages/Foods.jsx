import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { fetchMeals } from '../services/fetchRecipes';
import './Styles/Recipes.css';

function Foods() {
  const [listOfMeals, setListOfMeals] = useState([]);

  const fetchListOfMeals = async () => {
    const data = await fetchMeals();
    setListOfMeals(data);
  };

  useEffect(() => {
    fetchListOfMeals();
  }, []);

  const recipesQuantity = 12;
  const preparedRecipesList = () => listOfMeals
    .map((recipe, index) => (
      <Card
        key={ index }
        index={ index }
        thumbSource={
          recipe.strMealThumb
        }
        title={ recipe.strMeal }
      />
    ))
    .slice(0, recipesQuantity);

  return (
    <div id="Recipes">
      <Header title="Explorar Comidas" searchBtn />
      <div className="card-list">{preparedRecipesList()}</div>
      <Footer />
    </div>
  );
}

export default Foods;
