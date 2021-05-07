import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { requestByIngredient } from '../services/api';

function ExploreFoodsAndIngredients() {
  const [ingredients, setIngredient] = useState({});
  const { dataFromApi, setDataFromApi, setRestartRecipes } = useContext(RecipesContext);
  const history = useHistory();

  const mealURL = 'https://www.themealdb.com/api/json/v1/1/';
  const requestIngredient = async (endpoint) => {
    const request = await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => data);
    return request;
  };

  const requestIngredientList = async () => {
    const url = mealURL;
    const arrayMax = 12;
    const object = await requestIngredient(`${url}list.php?i=list`);
    setIngredient(object.meals.slice(0, arrayMax));
  };

  const handleClick = async (ingredient) => {
    const recipe = await requestByIngredient(ingredient, 'comidas');
    const { meals } = recipe;
    setDataFromApi({ ...dataFromApi, recipes: meals, loading: false });
    history.push('/comidas');
    setRestartRecipes(false);
  };

  useEffect(() => {
    requestIngredientList();
  }, []);

  if (!ingredients.length) return <p>Loading...</p>;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { ingredients.map(({ idIngredient, strIngredient }, index) => (
        <button
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          key={ idIngredient }
          onClick={ () => handleClick(strIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { strIngredient }
          </p>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodsAndIngredients;
