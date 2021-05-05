import React, { useContext } from 'react';
import { RecipesContext } from '../context';

export default function Dropdown() {
  const { values: { areas } } = useContext(RecipesContext);

  return (
    <select name="area" id="recipe-area" data-testid="explore-by-area-dropdown">
      <option value="">All</option>
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
