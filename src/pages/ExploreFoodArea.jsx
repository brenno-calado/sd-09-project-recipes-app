import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func } from 'prop-types';
import Lottie from 'react-lottie';
import { areasFetch, filterAreasFetch } from '../actions/areas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeItemFoods from '../components/RecipeItemFoods';
import '../Style/ExploreArea.css';
import MealLoading from '../images/lf30_editor_oblwx6ru.json';

function ExploreFoodArea({ getAreas, loading, areas, getFilters, filteredAreas }) {
  useEffect(() => {
    const INITIAL = '';
    getAreas();
    getFilters(INITIAL);
  }, [getAreas, getFilters]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: MealLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (loading) {
    return (
      <div className="animates">
        <Lottie
          options={ defaultOptions }
          height={ 400 }
          width={ 400 }
        />
      </div>
    );
  }

  const handleChange = ({ target: { value } }) => {
    getFilters(value);
  };

  const renderAreas = () => (
    <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
      <option data-testid="All-option" value="">All</option>
      { areas.map(({ strArea }) => (
        <option
          key={ strArea }
          data-testid={ `${strArea}-option` }
          value={ strArea }
          name="a"
        >
          { strArea }
        </option>
      )) }
    </select>
  );

  const MAX_RECIPES = 12;

  const renderFoods = () => (
    filteredAreas.map(
      (recipe, index) => index < MAX_RECIPES
      && <RecipeItemFoods recipe={ recipe } index={ index } />,
    )
  );

  return (
    <div>
      <Header page="Origem" />
      <div className="recipesAreas">
        <div className="areas">
          <h3>Localização</h3>
          { areas && renderAreas() }
        </div>
        <div className="foodsArea">
          { filteredAreas && renderFoods() }
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAreas: () => dispatch(areasFetch()),
  getFilters: (value) => dispatch(filterAreasFetch(value)),
});

const mapStateToProps = (state) => ({
  loading: state.setAreas.loading,
  areas: state.setAreas.areas,
  filteredAreas: state.setAreas.filteredAreas,
});

ExploreFoodArea.propTypes = {
  getAreas: func,
  getFilters: func,
  loading: bool,
  areas: arrayOf({}),
  filteredAreas: arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodArea);
