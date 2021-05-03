import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import fetchRandomRecipe from '../services/fetchRandomRecipe';

function ExplorarBebidas() {
  const [drink, setDrink] = useState('');
  useEffect(() => {
    const fetch = async () => {
      const random = await fetchRandomRecipe('cocktail');
      setDrink(random.drinks[0]);
    };
    fetch();
  }, []);
  const renderButtons = () => (
    <>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${drink.idDrink}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    </>
  );
  return (
    <div>
      <Header page="Explorar Bebidas" hasSearchButton={ false } />
      {renderButtons()}
      <BottomMenu />
    </div>
  );
}

export default ExplorarBebidas;
