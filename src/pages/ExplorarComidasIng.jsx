import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getMealsIngredients, getMealByIngredients } from '../services/MealFetch';
import MealContext from '../context/MealContext';
// import '../styles/recipes.css';

function ExplorarComidasIng() {
  const [mealsIngredient, setMealsIngredient] = useState([]);
  const { setFoods, redirect, setRedirect } = useContext(MealContext);
  const cardsLimit = 12;

  useEffect(() => {
    getMealsIngredients().then((response) => setMealsIngredient(response));
  }, []);

  function handleClick(ingredient) {
    getMealByIngredients(ingredient).then((response) => setFoods(response));
    setRedirect(true);
  }

  return (
    <>
      {redirect ? <Redirect to="/comidas" /> : null}

      <Header textProp="Explorar Ingredientes" />

      {mealsIngredient.slice(0, cardsLimit).map((ingredient, index) => (
        <button
          type="button"
          key={ Math.random() }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(ingredient.strIngredient) }
          value={ `${ingredient.strIngredient}` }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ `Imagem do prato ${ingredient.strIngredient}` }
            data-testid={ `${index}-card-img` }
            style={ { width: '150px' } }
          />
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
        </button>
      ))}

      <Footer />
    </>
  );
}

export default ExplorarComidasIng;
