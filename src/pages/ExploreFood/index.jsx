import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../../context';
import fetchApi from '../../services/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreFood() {
  const { supriseId, setSurpriseId } = useContext(context);

  async function randomId() {
    const fetchRandon = await fetchApi('food', 'random', '');
    setSurpriseId(fetchRandon.meals[0].idMeal);
  }

  useEffect(() => {
    randomId();
  }, []);

  function exploreFoodsIngredient() {
    return (
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
    );
  }

  function exploreFoodsArea() {
    return (
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
    );
  }

  function exploreFoodsSurprise() {
    return (
      <Link to={ `/comidas/${supriseId}` }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
    );
  }

  return (
    <>
      <Header title="Explorar Comidas" />
      <div>
        { exploreFoodsIngredient() }
        { exploreFoodsArea() }
        { exploreFoodsSurprise() }
      </div>
      <Footer />
    </>
  );
}
