import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const [meal, setMeal] = useState({});
  const history = useHistory();
  const handleClickToIngredients = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  const handleClickToArea = () => {
    history.push('/explorar/comidas/area');
  };

  const foodDetailsRandom = async () => {
    const requestMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json()
        .then((myMeal) => myMeal.meals[0]));
    setMeal(requestMeal);
  };
  foodDetailsRandom();

  const handleClickToSurpriseMe = () => {
    history.push(`/comidas/${meal.idMeal}`);
  };

  return (
    <div>
      <Header title="Explorar Comidas" />
      <br />
      <br />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickToIngredients }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ handleClickToArea }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClickToSurpriseMe }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
