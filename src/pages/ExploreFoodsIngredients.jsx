import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchApi from '../services';

function ExploreFoodsIngredients() {
  const MAX_NUMBER_OF_CARDS_12 = 12;
  const { mealIngredients } = useContext(MyContext);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <main>
        {
          mealIngredients.slice(0, MAX_NUMBER_OF_CARDS_12).map((curr, index) => (
            <Link to="/comidas" key={ index }>
              <div data-testid={ `${index}-ingredient-card` } className="card">
                <img
                  src={ fetchApi.getMealIngredientsImg(curr.strIngredient) }
                  alt=""
                  data-testid={ `${index}-card-img` }
                  className="card-img"
                />
                <p data-testid={ `${index}-card-name` } className="card-name">
                  { curr.strIngredient }
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

export default ExploreFoodsIngredients;
