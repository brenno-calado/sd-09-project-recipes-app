import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../common/components/Header';
import RecipeCard from '../../common/components/RecipeCard';

const Recipes = (props) => {
  const { meals } = props;
  const cardsLimit = 12;
  function renderRecipeCards() {
    return meals
      .slice(0, cardsLimit)
      .map((meal, index) => (
        <RecipeCard key={ index } index={ index } recipe={ meal } />));
  }

  return (
    <div>
      <Header title="Comidas" value="comidas" />
      { renderRecipeCards() }
    </div>
  );
};

const mapStateToProps = (state) => ({
  meals: state.searchReducer.meals,
});

Recipes.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Recipes);
