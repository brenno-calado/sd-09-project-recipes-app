import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../../context';
import fetchApi from '../../services/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreDrinks() {
  const { supriseId, setSurpriseId } = useContext(context);

  async function randomId() {
    const fetchRandon = await fetchApi('cocktail', 'random', '');
    setSurpriseId(fetchRandon.drinks[0].idDrink);
  }

  useEffect(() => {
    randomId();
  }, []);

  function exploreDrinkIngredient() {
    return (
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
    );
  }

  function exploreDrinkSurprise() {
    return (
      <Link to={ `/bebidas/${supriseId}` }/* to={ `/movies/${id}` */>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
    );
  }

  return (
    <>
      <Header title="Explorar Bebidas" />
      <div>
        { exploreDrinkIngredient() }
        { exploreDrinkSurprise() }
      </div>
      <Footer />
    </>
  );
}
