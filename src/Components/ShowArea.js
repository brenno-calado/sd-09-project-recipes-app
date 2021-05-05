import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { requestApiMealsArea } from '../redux/actions';
import { fetchFoodArea } from '../services/ApiRequest';

function ShowArea() {
  const [areas, setAreas] = useState([]);

  const getMealAreas = async () => {
    const response = await fetchFoodArea();
    setAreas(response.meals);
  };

  useEffect(() => {
    getMealAreas();
  }, []);
  areas.push({ strArea: 'All' });
  console.log(areas);
  return (
    <label htmlFor="selectArea">
      Nacionalidade
      <select
        data-testid="explore-by-area-dropdown"
        id="selectArea"
      >
        {!areas
          ? ''
          : areas.map(
            (item) => (
              <option
                key={ item.strArea }
                data-testid={ `${item.strArea}-option` }
                // onClick={ () => getMealByArea(item.strArea) }
              >
                {item.strArea}
              </option>
            ),
          )}
        <option
          key="All"
          data-testid="All-option"
        >
          All
        </option>
      </select>
    </label>
  );
}

// ShowArea.propType = {
//   getMealByArea: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   getMealByArea: (input) => dispatch(requestApiMealsArea(input)) });
// connect(null, mapDispatchToProps)
export default ShowArea;
