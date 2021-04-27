import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';

function Bebidas() {
  const { drinks } = useContext(AppContext);
  if (!drinks) return <p>Carregando...</p>;
  return (
    <>
      <Header title="Bebidas" searchIcon />
      { drinks && drinks.map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      )) }
    </>
  );
}

export default Bebidas;
