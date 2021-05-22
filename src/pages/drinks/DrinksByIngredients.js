import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { fetchIngredientList, fetchByIngredient } from '../../services/api';
import { Context } from '../../context';

function DrinksByIngredients() {
  const { updateData } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getIngredients = async () => {
    const result = await fetchIngredientList(false);
    const arraySize = 12;
    setIngredients(result.drinks.slice(0, arraySize));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleCLick = (ingredient) => {
    updateData(fetchByIngredient(ingredient, false))
      .then(() => setShouldRedirect(true));
  };

  if (!ingredients.length) return <div>Loading...</div>;
  if (shouldRedirect) return <Redirect to="/bebidas" />;

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      <h3 className="title-section">Lista de Ingredientes</h3>
      <section className="wrapper-buttons-ingredients">
        { ingredients.map(({ strIngredient1 }, index) => (
          <button
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleCLick(strIngredient1) }
            key={ strIngredient1 }
            type="button"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
          </button>)) }
      </section>
      <Footer />
    </section>
  );
}

export default DrinksByIngredients;
