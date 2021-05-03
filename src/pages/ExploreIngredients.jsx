import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Ingredient from '../components/Ingredients';
import { ingredientsFetch } from '../actions/Ingredients';
import Header from '../components/Header';

function ExploreIngredients({ match, getIngredients, data, loading }) {
  const type = match.params.page === 'comidas' ? 'meals' : 'drinks';
  useEffect(() => {
    getIngredients(match.params.page);
  }, [getIngredients, match]);
  if (loading) {
    return (
      <h3> Loading </h3>
    );
  }
  return (
    <div>
      <Header page="Explorar Ingredientes" />
      { data[type].map((ingredient, index) => {
        const nameIngredient = type === 'meals' ? 'strIngredient' : 'strIngredient1';
        const onze = 11;
        if (index > onze) {
          return null;
        }
        return (
          <Ingredient
            name={ ingredient[nameIngredient] }
            index={ index }
            key={ index }
            type={ type }
          />
        );
      })}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.setIngredients.data,
  loading: state.setIngredients.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getIngredients: (page) => dispatch(ingredientsFetch(page)),
});

ExploreIngredients.propTypes = {
  match: PropTypes.objectOf.isRequired,
  getIngredients: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired,
};
// Colocar o resultado da API no state usando useState;
// Fazer um MAP para encontrar os ingredientes
export default connect(mapStateToProps, mapDispatchToProps)(ExploreIngredients);
