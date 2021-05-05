import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import { fetchFoodsAPI } from '../services/fetchFoodsAPI';
import '../css/ExploreOrigin.css';

const ExploreOrigin = () => {
  const { foodAreas, recipesFoods, setRecipesFoods } = useContext(myContext);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesFoods.slice(0, MAX_LENGTH_RECIPES);

  const fetchRecipesByArea = async (area) => {
    const myRecipes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((data) => data.json());
    setRecipesFoods(myRecipes.meals);
  };

  const handleOriginChange = async (event) => {
    const { value } = event.target;
    if (value === 'All') {
      const allCaseRecipes = await fetchFoodsAPI();
      setRecipesFoods(allCaseRecipes);
      return;
    }
    fetchRecipesByArea(value);
  };

  return (
    <div className="explore-origin-body">
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleOriginChange }
        className="explore-origin-select"
      >
        <option key="All" data-testid="All-option">All</option>
        { foodAreas.map((area) => (
          <option
            key={ area.strArea }
            data-testid={ `${area.strArea}-option` }
            value={ area.strArea }
          >
            { area.strArea }
          </option>
        )) }
      </select>

      <div className="explore-origin-container">
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link
            key={ idMeal }
            to={ `/comidas/${idMeal}` }
            data-testid={ `${index}-recipe-card` }
            className="explore-origin-card"
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ExploreOrigin;
