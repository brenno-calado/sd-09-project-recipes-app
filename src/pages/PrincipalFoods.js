import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoods } from '../services/fetchAPI';
import RecipeCategory from '../components/RecipeCategory';

function PrincipalFoods() {
  const [foods, setFoods] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const history = useHistory();

  function toggleFunc(category, categoryValue) {
    if (categoryValue !== 'all') {
      setSelectedCategory(categoryValue);
      if (selectedCategory === categoryValue) setToggle(false);
      else {
        fetchFoods('category', category)
          .then((response) => setFilteredMeals(response));
        setToggle(true);
      }
    } else setToggle(false);
  }

  function redirectToDetails(id) {
    history.push(`/comidas/${id}`);
  }

  useEffect(() => {
    fetchFoods(null, 'a').then((response) => setFoods(response));
  }, []);

  const cardLimit = 12;
  const foodsMap = toggle ? Object.values(filteredMeals)[0] : Object.values(foods)[0];
  return (
    <>
      <Header title="Comidas" />
      <RecipeCategory type="meals" toggleFunc={ toggleFunc } setToggle={ setToggle } />
      {foodsMap && foodsMap.map((recipe, index) => {
        if (index < cardLimit) {
          return (
            <div
              key={ recipe.idMeal }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => redirectToDetails(recipe.idMeal) }
              onKeyPress={ () => redirectToDetails(recipe.idMeal) }
              role="button"
              tabIndex="0"
              style={ { cursor: 'pointer' } }
            >
              <img
                src={ recipe.strMealThumb }
                alt="recipe"
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
            </div>

          );
        }
        return 'food';
      })}
      <Footer />
    </>
  );
}
export default PrincipalFoods;
