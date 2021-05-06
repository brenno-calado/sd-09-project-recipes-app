import React, { useContext, useEffect } from 'react';
import { RecipesContext } from '../context';

export default function Dropdown() {
  const {
    values: { areas, areaFilter }, actions: { setAreaFilter },
  } = useContext(RecipesContext);

  // useEffect(() => setAreaFilter(''));

  async function filterRecipes(e) {
    const { value } = e.target;
    setAreaFilter(value);
  }

  return (
    <select
      name="area"
      id="recipe-area"
      data-testid="explore-by-area-dropdown"
      onChange={ filterRecipes }
      value={ areaFilter }
    >
      <option value="" data-testid="All-option">All</option>
      {
        Array.isArray(areas)
        && areas.map((area) => (
          <option
            data-testid={ `${area}-option` }
            value={ area }
            key={ area }
          >
            {area}

          </option>
        ))
      }
    </select>
  );
}
