import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipeSurpriseThunk } from '../redux/actions/actionsExplore';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreDrinks = ({ dispatchSurpriseRecipe, surpriseRecipe }) => {
  const fetchRandom = async (type) => {
    await dispatchSurpriseRecipe(type);
  };

  useEffect(() => {
    fetchRandom('bebidas');
  }, []);

  const renderButon = () => {
    if (surpriseRecipe.length !== 0) {
      const { idDrink } = surpriseRecipe[0];
      return (
        <div>
          <Header title="Explorar Bebidas" />
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${idDrink}` }>
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
          <Footer />
        </div>
      );
    }
  };

  const renderContent = () => (
    <div>
      Explorar Bebidas!
      { renderButon() }
    </div>
  );

  return (
    <div>{ renderContent() }</div>
  );
};

const mapStateToProps = (state) => ({
  surpriseRecipe: state.exploreRecipeReducer.randomRecommended,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSurpriseRecipe: (path) => dispatch(recipeSurpriseThunk(path)),
});

ExploreDrinks.propTypes = {
  dispatchSurpriseRecipe: PropTypes.func.isRequired,
  surpriseRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreDrinks);
