import React, { useState, useEffect, useContext } from 'react';
import { getAreaList, getByArea } from '../services/MealFetch';
import MealContext from '../context/MealContext';

function MainButtons() {
  const [areaList, setAreaList] = useState([]);
  const [filter, setFilter] = useState('');
  const { setFoods, foodFilter } = useContext(MealContext);

  function handleChange({ target: { value } }) {
    if (filter === value || value === 'all') {
      setFilter('');
      foodFilter();
      console.log('L14');
    } else {
      setFilter(value);
      getByArea(value).then((response) => setFoods(response));
      console.log('L18');
    }
  }

  useEffect(() => {
    getAreaList().then((response) => setAreaList(response));
  }, []);

  return (
    <select
      className="select"
      data-testid="explore-by-area-dropdown"
      onChange={ handleChange }
    >
      <option data-testid="All-option">All</option>
      {areaList.map((local) => (
        <option
          key={ Math.random() }
          data-testid={ `${local.strArea}-option` }
        >
          { local.strArea }
        </option>
      ))}
    </select>
  );
}

export default MainButtons;
