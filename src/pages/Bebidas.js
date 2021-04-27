import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  const { drinks, drinkCategories } = useContext(AppContext);
  if (!drinks) return <p>Carregando...</p>;
  return (
    <>
      <Header title="Bebidas" searchIcon />
      { drinkCategories && drinkCategories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          type="button"
        >
          {strCategory}
        </button>
      )) }
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
      <Footer />
    </>
  );
}

export default Bebidas;
