import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFoodArea } from '../services/ApiRequest';
import { requestApiMealsArea, requestApiMeals } from '../redux/actions/index';

function ShowArea({ getMealsByArea, getMeals }) {
  const [areas, setAreas] = useState([]);

  const getMealAreas = async () => {
    const response = await fetchFoodArea();
    setAreas(response.meals);
  };

  useEffect(() => {
    getMealAreas();
  }, []);

  return (
    <label htmlFor="selectArea">
      Nacionalidade
      <select
        data-testid="explore-by-area-dropdown"
        id="selectArea"
        name="nationality"
        onChange={ (e) => getMealsByArea(e.target.value) }
        value="select"
      >
        {!areas
          ? ''
          : areas.map(
            (item) => (
              <option
                key={ item.strArea }
                data-testid={ `${item.strArea}-option` }
              >
                {item.strArea}
              </option>
            ),
          )}
        <option
          key="All"
          data-testid="All-option"
          onClick={ () => getMeals() }
        >
          All
        </option>
      </select>
    </label>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getMealsByArea: (input) => dispatch(requestApiMealsArea(input)),
  getMeals: () => dispatch(requestApiMeals()),
});

ShowArea.propTypes = {
  getMealsByArea: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ShowArea);
