import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealContext from '../context/MealContext';

function PrincipalBebidas() {
  const { foods } = useContext(MealContext);
  const cardsLimit = 12;
  return (
    <div>
      {foods.length === 1
        ? <Redirect to={ `/bebidas/${foods[0].idDrink}` } /> : null}

      <Header textProp="Bebidas" />

      {foods.slice(0, cardsLimit).map((drink, index) => (
        <div key={ Math.random() }>
          <Link
            to={ `/bebidas/${drink.idDrink}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ `Imagem do drink ${drink.idDrink}` }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
            />
          </Link>
          <h4 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h4>
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default PrincipalBebidas;
