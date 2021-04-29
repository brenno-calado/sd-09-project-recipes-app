import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import RecipeCard from '../../common/components/RecipeCard';

const Recipes = (props) => {
  const { meals, history } = props;
  const cardsLimit = 12;
  function renderRecipeCards() {
    return meals
      .slice(0, cardsLimit)
      .map((meal, index) => (
        <RecipeCard key={ index } index={ index } recipe={ meal } />));
  }

  return (
    <div>
      <Header title="Comidas" value="comidas" history={ history } />
      { meals.length > 1 && renderRecipeCards() }
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  meals: state.searchReducer.meals,
});

Recipes.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({}).isRequired,
};


export default connect(mapStateToProps)(Recipes);
