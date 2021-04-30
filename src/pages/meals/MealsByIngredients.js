import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { fetchIngredientList, fetchByIngredient } from '../../services/api';
import { Context } from '../../context';

function MealsByIngredients() {
  const { updateData } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getIngredients = async () => {
    const result = await fetchIngredientList(true);
    const arraySize = 12;
    setIngredients(result.meals.slice(0, arraySize));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleCLick = (ingredient) => {
    updateData(fetchByIngredient(ingredient, true))
      .then(() => setShouldRedirect(true));
  };

  if (!ingredients.length) return <div>Loading...</div>;
  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      { ingredients.map(({ strIngredient }, index) => (
        <button
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleCLick(strIngredient) }
          key={ strIngredient }
          type="button"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
        </button>)) }
      <Footer />
    </section>
  );
}

export default MealsByIngredients;
