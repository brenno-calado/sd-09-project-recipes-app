import React from 'react';
import { arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { filteredFetch } from '../actions/filterList';

function Filters({ filters, path, setFiltered }) {
  if (!filters) return <h3>Loading</h3>;

  const FILTER_LIMIT = 5;

  return (
    <div>
      <h4>Filtros</h4>
      { filters.map(({ strCategory }, index) => index < FILTER_LIMIT && (
        <button
          type="button"
          key={ strCategory }
          onClick={ () => setFiltered(strCategory, path) }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      )) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  filters: state.setFilters.filtersList,
});

const mapDispatchToProps = (dispatch) => ({
  setFiltered: (filter, path) => dispatch(filteredFetch(filter, path)),
});

Filters.propTypes = {
  filters: arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
