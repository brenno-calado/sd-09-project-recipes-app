import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipeSurpriseThunk } from '../redux/actions/actionsExplore';

const ExploreFoods = ({ dispatchSurpriseRecipe, surpriseRecipe }) => {
  const fetchRandom = async (type) => {
    await dispatchSurpriseRecipe(type);
  };

  useEffect(() => {
    fetchRandom('comidas');
  }, []);

  const renderButon = () => {
    if (surpriseRecipe.length !== 0) {
      const { idMeal } = surpriseRecipe[0];
      return (
        <div>
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
          <Link to={ `/comidas/${idMeal}` }>
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      );
    }
  };

  const renderContent = () => (
    <div>
      Explorar Comidas!
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

ExploreFoods.propTypes = {
  dispatchSurpriseRecipe: PropTypes.func.isRequired,
  surpriseRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoods);
