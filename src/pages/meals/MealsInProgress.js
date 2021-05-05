import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { getItemLocalStorage, updateLocalStorage }
  from '../../services/localStorageService';
import IngredientsContainer from '../../components/IngredientsContainer';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MealsInProgress() {
  const { id } = useParams();
  const { disableButton } = useContext(Context);
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    getData();
  }, [id]);

  const handleClick = () => {
    const doneRecipe = {
      id,
      type: 'comida',
      area: data.strArea,
      category: data.strCategory,
      name: data.strMeal,
      image: data.strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: data.strTags.split(','),
    };
    updateLocalStorage('doneOrFavoriteRecipes', 'doneRecipes', doneRecipe);
    setShouldRedirect(true);
  };

  const favoriteRecipe = localStorage.favoriteRecipes && Object
    .keys(getItemLocalStorage('favoriteRecipes')).includes(id);

  const favorite = () => {
    // if (!favoriteRecipe) {
    const favoriteItem = {
      id,
      type: 'comida',
      area: data.strArea,
      category: data.strCategory,
      name: data.strDrink,
      image: data.strDrinkThumb,
    };
    updateLocalStorage('doneOrFavoriteRecipes', 'favoriteRecipes', favoriteItem);
    // }
  };

  const { strMealThumb, strMeal, strCategory, strInstructions } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button" onClick={ favorite }>
        <img
          src={ !favoriteRecipe ? whiteHeartIcon : blackHeartIcon }
          alt="favorite icon"
        />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>

      <IngredientsContainer data={ data } />

      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ handleClick }
        disabled={ disableButton }
      >
        Finalizar Receita
      </button>
    </section>
  );
}

export default MealsInProgress;
