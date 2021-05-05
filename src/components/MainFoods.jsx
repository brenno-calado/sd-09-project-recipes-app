import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from './Header';
import MainButtons from './MainButtons';
import Footer from './Footer';
import MealContext from '../context/MealContext';

function MainFoods() {
  let { foods } = useContext(MealContext);
  foods = foods || []; // Refatorar para resolver problema de assincronicidade
  const cardsLimit = 12;

  return (
    <>
      {foods.length === 1
        ? <Redirect to={ `/comidas/${foods[0].idMeal}` } /> : null}

      <Header textProp="Comidas" />

      <MainButtons />

      {foods.slice(0, cardsLimit).map((food, index) => (
        <div key={ Math.random() }>
          <Link
            to={ `/comidas/${food.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ food.strMealThumb }
              alt={ `Imagem do prato ${food.idMeal}` }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
            />
          </Link>
          <h4 data-testid={ `${index}-card-name` }>{ food.strMeal }</h4>
        </div>
      ))}

      <Footer />
    </>
  );
}

export default MainFoods;
