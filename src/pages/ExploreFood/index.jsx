import React from 'react';
import { Link } from 'react-router-dom';
import fetchApi from '../../services/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

let id = 0;

async function randomId() {
  const fetchRandon = await fetchApi('food', 'random', '');
  id = (fetchRandon.meals[0].idMeal);
}

function exploreFoodsIngredient() {
  return (
    <Link to="/explorar/comidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
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
  // trocarar para um id aleatoraio apos a tela de detalhes pronta to={ `/movies/${id}` }
  randomId();
  console.log(id);

  return (
    <Link to="/explorar/comidas"/* to={ `/movies/${id}` */>
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </Link>
  );
}

export default function ExploreFood() {
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
