import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function ExploreDrinkIngredients() {
  const [ingredientNames, setNames] = useState([]);

  useEffect(() => {
    const twelve = 12;
    (async function ingredientApi() {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        const data = await response.json();
        const dataNames = data.drinks.slice(0, twelve);
        setNames([...dataNames]);
      } catch (error) {
        console.error(error);
      }
    }());
  }, []);

  const renderIngredients = () => (
    ingredientNames.map((names, index) => (
      <div
        key={ names.strIngredient1 }
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ `https://www.thecocktaildb.com/images/ingredients/${names.strIngredient1}-Small.png` }
          alt={ `${names.strIngredient1}-ingredients` }
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {`${names.strIngredient1}`}
        </p>
      </div>))
  );

  return (
    <div>
      <Header titleHeader="Explorar Ingredientes" id="1" />
      <div>{ renderIngredients() }</div>
    </div>
  );
}

export default ExploreDrinkIngredients;
