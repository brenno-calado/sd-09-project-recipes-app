import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import IngredientCard from '../../common/components/IngredientCard';
import { fetchMealIngredients } from '../../services/fetchMealAPI';

function ExploreFoodByIngredients({ history }) {
  const [ingredients, setIngredients] = useState();
  const cardsLimit = 12;

  useEffect(() => {
    async function getIngredients() {
      await fetchMealIngredients().then((response) => setIngredients(response.meals));
    }
    getIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" isSearchEnable={ false } />
      { ingredients && ingredients.slice(0, cardsLimit).map((ingredient, index) => (
        <IngredientCard
          key={ ingredient.strIngredient }
          ingredient={ ingredient.strIngredient }
          type="comida"
          index={ index }
          history={ history }
        />))}
      <Footer />
    </div>
  );
}

ExploreFoodByIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoodByIngredients;
