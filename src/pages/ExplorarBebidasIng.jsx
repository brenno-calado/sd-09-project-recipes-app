import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDrinksIngredients } from '../services/DrinkFetch';
// import '../styles/recipes.css';

function ExplorarComidasIng() {
  const [drinksIngredient, setDrinksIngredient] = useState([]);

  const cardsLimit = 12;

  useEffect(() => {
    getDrinksIngredients().then((response) => setDrinksIngredient(response));
  }, []);

  return (
    <>
      <Header textProp="Explorar Ingredientes" />

      {drinksIngredient.slice(0, cardsLimit).map((ingredient, index) => (
        <div key={ Math.random() }>
          <Link
            to="/bebidas"
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ `Imagem do drink ${ingredient.strIngredient1}` }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
            />
          </Link>
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
        </div>
      ))}

      <Footer />
    </>
  );
}

export default ExplorarComidasIng;
