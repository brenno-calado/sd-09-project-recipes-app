import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import fetchFoodsAPI from '../services/fetchFoodsAPI';

const imgStyle = {
  maxWidth: '150x',
  maxHeight: '150px',
  margin: 'auto',
};

// a tela é 360 x 640
const containerStyle = {
  overflowY: 'scroll',
  width: '300px',
  maxHeight: '300px',
  marginTop: '100px',
};

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
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleOriginChange }
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

      <div style={ containerStyle }>
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link key={ idMeal } to={ `/comidas/${idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ strMealThumb }
                style={ imgStyle }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ExploreOrigin;
