import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { setArea, recipeQuery, recipeCase, clearList, recipeType } from '../actions';
import Recipes from '../components/Recipes';

function ComidaOrigem({ foodArea, areas, searchArea, foodCase, clear, foodType }) {
  useEffect(() => {
    foodArea();
    clear();
  }, [foodArea, clear]);

  const handleChange = ({ target: { value } }) => {
    if (value === 'all') {
      foodCase(null);
      searchArea(null);
      foodType('meal');
      clear();
    } else {
      foodCase('area');
      searchArea(value);
      clear();
    }
  };

  const renderDropDown = () => (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        <option
          value="all"
          data-testid="All-option"
        >
          All
        </option>
        {areas.map(({ strArea }) => (
          areas.length > 0 && (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
              value={ strArea }
            >
              {strArea}
            </option>
          )))}
      </select>
    </div>
  );

  return (
    <div>
      <Header page="Explorar Origem" />
      {renderDropDown()}
      <Recipes />
      <BottomMenu />
    </div>
  );
}

const mapStateToProps = (state) => ({
  areas: state.mealsArea.areaNames,
});

const mapDispatchToProps = (dispatch) => ({
  foodArea: () => dispatch(setArea()),
  foodCase: (type) => dispatch(recipeCase(type)),
  searchArea: (area) => dispatch(recipeQuery(area)),
  foodType: (type) => dispatch(recipeType(type)),
  clear: () => dispatch(clearList()),
});

ComidaOrigem.propTypes = {
  foodArea: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ComidaOrigem);
