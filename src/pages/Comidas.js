import React, { useContext } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';

function Comidas() {
  const { foods } = useContext(AppContext);
  if (!foods) return <p>Carregando...</p>;

  return (
    <>
      <Header title="Comidas" searchIcon />
      { foods && foods.map((food, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
        </div>
      )) }
    </>
  );
}

export default Comidas;
