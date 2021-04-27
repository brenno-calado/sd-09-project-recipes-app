import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';

function Comidas() {
  const { foods, foodCategories } = useContext(AppContext);
  if (!foods) return <p>Carregando...</p>;

  return (
    <>
      <Header title="Comidas" searchIcon />
      { foodCategories && foodCategories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          type="button"
        >
          {strCategory}
        </button>
      )) }
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
      <Footer />
    </>
  );
}

export default Comidas;
