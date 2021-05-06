import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function DrinkIngredients() {
  const [ingredientNames, setNames] = useState([]);
  const limit = 12;

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        const result = await response.json();
        const dataNames = (result.drinks.slice(0, limit));
        setNames([...dataNames]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchDrinks();
  }, []);

  console.log(ingredientNames);

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
      { renderCardIngredients() }
      <MenuInferior />
    </div>
  );
}

export default DrinkIngredients;
