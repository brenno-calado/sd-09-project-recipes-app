import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function DrinkIngredients() {
  const [ingredientNames, setNames] = useState([]);

  useEffect(() => {
    const cardLength = 12;
    (async function getIngredientApi() {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const data = await response.json();
        const dataNames = data.drinks.slice(0, cardLength);
        setNames([...dataNames]);
      } catch (error) {
        console.error(error);
      }
    }());
  }, []);

  const renderCardIngredients = () => (
    ingredientNames.map((names, index) => (
      <Link to="/bebidas" key={ names.strIngredient1 }>
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ names.strIngredient1 }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${names.strIngredient1}-Small.png` }
            alt={ `${names.strIngredient1}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{`${names.strIngredient1}`}</p>
        </div>
      </Link>
    ))
  );

  return (
    <div>
      <Header />
      <div>{ renderCardIngredients() }</div>
      <MenuInferior />
    </div>
  );
}

export default DrinkIngredients;
