import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func } from 'prop-types';
import { areasFetch, filterAreasFetch } from '../actions/areas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeItemFoods from '../components/RecipeItemFoods';

function ExploreFoodArea({ getAreas, loading, areas, getFilters, filteredAreas }) {
  useEffect(() => {
    const INITIAL = '';
    getAreas();
    getFilters(INITIAL);
  }, [getAreas, getFilters]);

  if (loading) return <h3>Loading</h3>;

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
      <Header page="Explorar Origem" search />
      { areas && renderAreas() }
      { filteredAreas && renderFoods() }
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
