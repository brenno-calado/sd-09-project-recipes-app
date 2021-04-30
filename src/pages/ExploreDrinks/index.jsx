import React from 'react';
import { Link } from 'react-router-dom';
import fetchApi from '../../services/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

let id = 0;

async function randomId() {
  const fetchRandon = await fetchApi('cocktail', 'random', '');
  id = (fetchRandon.drinks[0].idDrink);
}

function exploreDrinkIngredient() {
  return (
    <Link to="/explorar/bebidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
  );
}

function exploreDrinkSurprise() {
  // trocarar para um id aleatoraio apos a tela de detalhes pronta to={ `/movies/${id}` }
  randomId();
  console.log(id);

  return (
    <Link to="/explorar/comidas"/* to={ `/movies/${id}` */>
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </Link>
  );
}

export default function ExploreDrinks() {
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
