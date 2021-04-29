import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchIngredientsList, fetchForIngredients } from '../services/api';
import { Context } from '../context/Context';

function MealsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSearchResult } = useContext(Context);

  const getIngredients = async () => {
    const result = await fetchIngredientsList(true);
    const arraySize = 12;
    setIngredients(result.meals.slice(0, arraySize));
  };

  const handleClick = async (ingredient) => {
    setSearchResult(await fetchForIngredients(ingredient, true));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      { ingredients.length && ingredients.map(({ strIngredient }, index) => (
        <Link
          to="/comidas"
          onClick={ () => handleClick(strIngredient) }
          key={ strIngredient }
        >
          <span data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
          </span>
        </Link>
      ))}
      <Footer />
    </section>
  );
}

export default MealsByIngredients;
