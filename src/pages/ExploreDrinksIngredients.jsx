import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import fetchApi from '../services';

function ExploreDrinksIngredients() {
  const MAX_NUMBER_OF_CARDS_12 = 12;
  const { drinksIngredients } = useContext(MyContext);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <main>
        {
          drinksIngredients.slice(0, MAX_NUMBER_OF_CARDS_12).map((curr, index) => (
            <Link to="/bebidas" key={ index }>
              <div data-testid={ `${index}-ingredient-card` } className="card">
                <img
                  src={ fetchApi.getDrinkIngredientsImg(curr.strIngredient1) }
                  alt=""
                  data-testid={ `${index}-card-img` }
                  className="card-img"
                />
                <p data-testid={ `${index}-card-name` } className="card-name">
                  { curr.strIngredient1 }
                </p>
              </div>
            </Link>
          ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
