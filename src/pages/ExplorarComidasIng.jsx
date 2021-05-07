import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getMealsIngredients } from '../services/MealFetch';
// import '../styles/recipes.css';

function ExplorarComidasIng() {
  const [mealsIngredient, setMealsIngredient] = useState([]);
  const cardsLimit = 12;

  useEffect(() => {
    getMealsIngredients().then((response) => setMealsIngredient(response));
  }, []);

  return (
    <>
      <Header textProp="Explorar Ingredientes" />

      {mealsIngredient.slice(0, cardsLimit).map((ingredient, index) => (
        <div key={ Math.random() }>
          <Link
            to="/comidas"
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt={ `Imagem do prato ${ingredient.strIngredient}` }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
            />
          </Link>
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
        </div>
      ))}

      <Footer />
    </>
  );
}

export default ExplorarComidasIng;
