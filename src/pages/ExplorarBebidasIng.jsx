import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDrinksIngredients, getDrinkByIngredients } from '../services/DrinkFetch';
import MealContext from '../context/MealContext';
// import '../styles/recipes.css';

function ExplorarComidasIng() {
  const [drinksIngredient, setDrinksIngredient] = useState([]);
  const { setFoods, redirect, setRedirect } = useContext(MealContext);
  const cardsLimit = 12;

  useEffect(() => {
    getDrinksIngredients().then((response) => setDrinksIngredient(response));
  }, []);

  function handleClick(ingredient) {
    getDrinkByIngredients(ingredient).then((response) => setFoods(response));
    setRedirect(true);
  }

  return (
    <>
      {redirect ? <Redirect to="/bebidas" /> : null}

      <Header textProp="Explorar Ingredientes" />

      {drinksIngredient.slice(0, cardsLimit).map((ingredient, index) => (
        <button
          type="button"
          key={ Math.random() }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(ingredient.strIngredient1) }
          value={ `${ingredient.strIngredient1}` }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt={ `Imagem do drink ${ingredient.strIngredient1}` }
            data-testid={ `${index}-card-img` }
            style={ { width: '150px' } }
          />
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
        </button>
      ))}

      <Footer />
    </>
  );
}

export default ExplorarComidasIng;
