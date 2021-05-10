import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getMealsFromIngredient } from '../services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ExplorarComidasIngredientes.css';

const MAX_INGREDIENTS = 12;

function ExplorarComidasIngredientes() {
  const { mealIngredients, setFoodApiResults } = useContext(AppContext);

  const handleClick = async (ingredient) => {
    const results = await getMealsFromIngredient(ingredient);
    setFoodApiResults(results);
  };

  if (!mealIngredients) return <p>Carregando...</p>;

  return (
    <>
      <Header title="Explorar Ingredientes" searchIcon={ false } />
      <section className="ingredient-section">
        <div className="ingredient-list">
          { mealIngredients
            && mealIngredients.slice(0, MAX_INGREDIENTS)
              .map(({ idIngredient, strIngredient }, index) => (
                <Link
                  to="/comidas"
                  key={ idIngredient }
                  onClick={ () => handleClick(strIngredient) }
                >
                  <div
                    className="ingredient-card"
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                      alt={ strIngredient }
                    />
                    <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
                  </div>
                </Link>
              )) }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ExplorarComidasIngredientes;
