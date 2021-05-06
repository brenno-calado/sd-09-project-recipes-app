import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { updateLocalStorage }
  from '../../services/localStorageService';
import { addToFavorite, removeToFavorite,
  verifyItemInFavorite } from '../../services/functionsApi';
import IngredientsContainer from '../../components/IngredientsContainer';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MealsInProgress() {
  const { id } = useParams();
  const { disableButton } = useContext(Context);
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    setFavoriteRecipe(verifyItemInFavorite(id));
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

  const share = () => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}/comidas/${id}`);
    setCopy(true);
  };

  const favorite = () => {
    if (!favoriteRecipe) {
      addToFavorite('meals', data);
    } else {
      removeToFavorite(id);
    }
    setFavoriteRecipe(!favoriteRecipe);
  };

  const { strMealThumb, strMeal, strCategory, strInstructions } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button" onClick={ share }>
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ favorite }
        src={ !favoriteRecipe ? whiteHeartIcon : blackHeartIcon }
      >
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
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default MealsInProgress;
