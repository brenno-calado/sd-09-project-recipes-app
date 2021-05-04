import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealContext from '../context/MealContext';

function PrincipalComidas() {
  const { foods } = useContext(MealContext);
  const cardsLimit = 12;

  return (
    <div>
      {foods.length === 1
        ? <Redirect to={ `/comidas/${foods[0].idMeal}` } /> : null}

      <Header textProp="Comidas" />

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
    </div>
  );
}

export default PrincipalComidas;
