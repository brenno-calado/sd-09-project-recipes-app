import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { requestRecipes } from '../services/api';
import './ExploreArea.css';

function ExploreArea() {
  const { showSearchBar, foodAreas,
    recipesFoods, setRecipesFoods } = useContext(RecipesContext);
  const twelveCountries = 12;
  const recipes = recipesFoods.slice(0, twelveCountries);

  async function requestRecipesByArea(area) {
    const requestRec = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => response.json());
    setRecipesFoods(requestRec.meals);
  }

  const handleChange = async ({ target }) => {
    const { value } = target;
    if (value === 'All') {
      const allRecipes = await requestRecipes();
      setRecipesFoods(allRecipes);
      return;
    }
    requestRecipesByArea(value);
  };

  return (
    <div>
      <Header showSearchButton="true" title="Explorar Origem" />
      { showSearchBar && <SearchBar /> }
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
        className="seta"
      >
        <option data-testid="All-option">All</option>
        { foodAreas.map((area) => (
          <option
            key={ area.strArea }
            data-testid={ `${area.strArea}-option` }
            value={ area.strArea }
          >
            { area.strArea }
          </option>
        ))}
      </select>
      { recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <Link
          key={ idMeal }
          to={ `comidas/${idMeal}` }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
            className="food-area"
          />
          <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
        </Link>
      ))}
      <Link to="/explorar/bebidas/area">
        <h1>Not Found</h1>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreArea;
