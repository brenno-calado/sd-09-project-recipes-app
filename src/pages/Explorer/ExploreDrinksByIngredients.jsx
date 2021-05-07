import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import IngredientCard from '../../common/components/IngredientCard';
import { fetchDrinkIngredients } from '../../services/fetchDrinkAPI';

function ExploreDrinksByIngredients({ history }) {
  const [ingredients, setIngredients] = useState();
  const cardsLimit = 12;

  useEffect(() => {
    async function getIngredients() {
      await fetchDrinkIngredients().then((response) => setIngredients(response.drinks));
    }
    getIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" isSearchEnable={ false } />
      { ingredients && ingredients.slice(0, cardsLimit).map((ingredient, index) => (
        <IngredientCard
          key={ (Object.values(ingredient)) }
          ingredient={ (Object.values(ingredient)) }
          type="bebida"
          index={ index }
          history={ history }
        />))}
      <Footer />
    </div>
  );
}

ExploreDrinksByIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinksByIngredients;
