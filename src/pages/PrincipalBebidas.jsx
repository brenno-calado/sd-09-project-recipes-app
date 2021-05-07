import React, { useCallback, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MainButtons from '../components/MainButtons';
import Footer from '../components/Footer';
import MealContext from '../context/MealContext';

function PrincipalBebidas() {
  const { drinkFilter, redirect, setRedirect } = useContext(MealContext);
  let { foods } = useContext(MealContext);
  foods = foods || []; // Refatorar para resolver problema de assincronicidade
  const cardsLimit = 12;

  const drinkFilterCallBack = useCallback(() => drinkFilter(), [drinkFilter]);

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    } else {
      drinkFilterCallBack();
    }
  }, []);

  return (
    <>
      {foods.length === 1
        ? <Redirect to={ `/bebidas/${foods[0].idDrink}` } /> : null}

      <Header textProp="Bebidas" />

      <MainButtons />

      {foods.slice(0, cardsLimit).map((drink, index) => (
        <div key={ Math.random() }>
          <Link
            to={ `/bebidas/${drink.idDrink}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ `Imagem do prato ${drink.idDrink}` }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
            />
          </Link>
          <h4 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h4>
        </div>
      ))}

      <Footer />
    </>
  );
}

export default PrincipalBebidas;
