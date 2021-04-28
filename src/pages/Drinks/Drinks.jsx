import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../common/components/Header';
import RecipeCard from '../../common/components/RecipeCard';

const Drinks = (props) => {
  const { drinks } = props;
  const cardsLimit = 12;
  function renderDrinkCards() {
    return drinks
      .slice(0, cardsLimit)
      .map((drink, index) => (
        <RecipeCard key={ index } index={ index } recipe={ drink } />));
  }

  return (
    <div>
      <Header title="Bebidas" value="bebidas" />
      { renderDrinkCards() }
    </div>
  );
};

const mapStateToProps = (state) => ({
  drinks: state.searchReducer.drinks,
});

Drinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Drinks);
