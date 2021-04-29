import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import { fetchMealNameAPI } from '../../services/fetchMealAPI';
import { saveMeals } from '../../actions/userActions';
import RenderRecipeCards from '../../common/components/RenderRecipeCards';

const Recipes = (props) => {
  const { meals, history } = props;

  async function fetchData() {
    const { dispatchMeals } = props;
    await fetchMealNameAPI('').then((response) => dispatchMeals(response));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (meals) {
    return (
      <>
        <Header title="Comidas" value="comidas" history={ history } />
        <RenderRecipeCards list={ meals } kindOfFood="meals" cardsLimit="12" />
        <Footer />
      </>
    );
  }

  return (
    <>
      Carregando...
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(saveMeals(meals)),
});

const mapStateToProps = (state) => ({
  meals: state.searchReducer.meals,
});

Recipes.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({}).isRequired,
  dispatchMeals: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
