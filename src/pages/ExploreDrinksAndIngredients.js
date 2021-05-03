import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinksAndIngredients() {
  const [ingredientDrink, setIngredientDrink] = useState({});

  const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const requestIngredient = async (endpoint) => {
    const request = await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => data);
    return request;
  };

  const requestIngredientList = async () => {
    const url = drinkURL;
    const arrayMax = 12;
    const object = await requestIngredient(`${url}list.php?i=list`);
    setIngredientDrink(object.drinks.slice(0, arrayMax));
  };

  useEffect(() => {
    requestIngredientList();
  }, []);

  if (!ingredientDrink.length) return <p>Loading...</p>;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { ingredientDrink.map(({ strIngredient1 }, index) => (
        <section
          data-testid={ `${index}-ingredient-card` }
          key={ strIngredient1 }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { strIngredient1 }
          </p>
        </section>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreDrinksAndIngredients;
