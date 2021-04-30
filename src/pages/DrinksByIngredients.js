import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchIngredientsList, fetchForIngredients } from '../services/api';
import { Context } from '../context/Context';

function DrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSearchResult, setIsFetchIngredient } = useContext(Context);

  const getIngredients = async () => {
    const result = await fetchIngredientsList(false);
    const arraySize = 12;
    setIngredients(result.drinks.slice(0, arraySize));
  };

  const handleClick = async (ingredient) => {
    setSearchResult(await fetchForIngredients(ingredient, false));
    setIsFetchIngredient(true);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      { ingredients.length && ingredients.map(({ strIngredient1 }, index) => (
        <Link
          to="/bebidas"
          onClick={ () => handleClick(strIngredient1) }
          key={ strIngredient1 }
        >
          <span data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
          </span>
        </Link>
      ))}
      <Footer />
    </section>
  );
}

export default DrinksByIngredients;
