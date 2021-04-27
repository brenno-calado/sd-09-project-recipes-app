import React from 'react';
import { arrayOf } from 'prop-types';
import { connect } from 'react-redux';

function Filters({ filters }) {
  if (!filters) return <h3>Loading</h3>;

  const FILTER_LIMIT = 5;

  return (
    <div>
      <h4>Filtros</h4>
      { filters.map(({ strCategory }, index) => index < FILTER_LIMIT && (
        <button
          type="button"
          key={ strCategory }
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

Filters.propTypes = {
  filters: arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(Filters);
