import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import fetchRandomRecipe from '../services/fetchRandomRecipe';

function ExplorarComidas() {
  const [meal, setMeal] = useState('');
  useEffect(() => {
    const fetch = async () => {
      console.log('entrou no useEffect');
      const random = await fetchRandomRecipe('meal');
      setMeal(random.meals[0]);
    };
    fetch();
  }, []);
  const renderButtons = () => (
    <>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${meal.idMeal}` }>
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
      <Header page="Explorar Comidas" hasSearchButton={ false } />
      {renderButtons()}
      <BottomMenu />
    </div>
  );
}

export default ExplorarComidas;
