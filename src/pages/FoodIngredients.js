import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

const FoodIngredients = () => {
  const [ingredientNames, setNames] = useState([]);
  const limit = 12;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const result = await response.json();
        const dataNames = (result.meals.slice(0, limit));
        setNames([...dataNames]);
        console.log(dataNames);
      } catch (error) {
        return Error(error);
      }
    };
    fetchMeals();
  }, []);

  const renderCardIngredients = () => (
    ingredientNames.map((names, index) => (
      <Link to="/comidas" key={ names.strIngredient }>
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ names.strIngredient }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${names.strIngredient}-Small.png` }
            alt={ `${names.strIngredient}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{`${names.strIngredient}`}</p>
        </div>
      </Link>
    ))
  );

  return (
    <div>
      <Header />
      { renderCardIngredients() }
      <MenuInferior />
    </div>
  );
};

export default FoodIngredients;
