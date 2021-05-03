import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../Provider/RecipesContext';

function RecipeAreasFilter() {
  const { fetchFoodsByArea } = useContext(RecipesContext);
  const [fetchingAreas, setFetchingAreas] = useState(true);
  const [areasList, setAreasList] = useState([]);

  useEffect(() => {
    async function fetchAreasList() {
      try {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        setAreasList([{ strArea: 'All' }, ...jsonResponse.meals]);
        setFetchingAreas(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAreasList();
  }, []);

  function handleAreasSelect({ target: { value } }) {
    fetchFoodsByArea(value);
  }

  if (fetchingAreas) return <p>Loading Areas...</p>;
  return (
    <select data-testid="explore-by-area-dropdown" onChange={ handleAreasSelect }>
      { areasList.map(({ strArea }) => (
        <option
          key={ `${strArea}-option` }
          data-testid={ `${strArea}-option` }
        >
          { strArea }
        </option>
      ))}
    </select>
  );
}

export default RecipeAreasFilter;
