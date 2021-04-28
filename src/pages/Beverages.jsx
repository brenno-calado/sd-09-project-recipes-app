import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { fetchBeverages } from '../services/fetchRecipes';
import './Styles/Recipes.css';

function Beverages() {
  const [listOfDrinks, setListOfDrinks] = useState([]);

  const fetchListOfDrinks = async () => {
    const data = await fetchBeverages();
    setListOfDrinks(data);
  };

  useEffect(() => {
    fetchListOfDrinks();
  }, []);

  const recipesQuantity = 12;
  const preparedRecipesList = () => listOfDrinks
    .map((recipe, index) => (
      <Card
        key={ index }
        index={ index }
        thumbSource={
          recipe.strDrinkThumb
        }
        title={ recipe.strDrink }
      />
    ))
    .slice(0, recipesQuantity);

  return (
    <div id="Recipes">
      <Header title="Explorar Bebidas" searchBtn />
      <div className="card-list">{preparedRecipesList()}</div>
      <Footer />
    </div>
  );
}

export default Beverages;
