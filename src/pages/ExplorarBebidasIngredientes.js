import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getDrinksFromIngredient } from '../services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ExplorarBebidasIngredientes.css';

const MAX_INGREDIENTS = 12;

function ExplorarBebidasIngredientes() {
  const { drinkIngredients, setDrinksApiResults } = useContext(AppContext);

  const handleClick = async (ingredient) => {
    const results = await getDrinksFromIngredient(ingredient);
    setDrinksApiResults(results);
  };

  if (!drinkIngredients) return <p>Carregando...</p>;

  return (
    <>
      <Header title="Explorar Ingredientes" searchIcon={ false } />
      <section className="drink-ingredient-section">
        <div className="card-list">
          { drinkIngredients
            && drinkIngredients.slice(0, MAX_INGREDIENTS)
              .map(({ strIngredient1 }, index) => (
                <Link
                  to="/bebidas"
                  key={ index }
                  onClick={ () => handleClick(strIngredient1) }
                >
                  <div
                    className="ingredient-card"
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                      alt={ strIngredient1 }
                    />
                    <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
                  </div>
                </Link>
              )) }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ExplorarBebidasIngredientes;
