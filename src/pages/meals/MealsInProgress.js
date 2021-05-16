import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { IngredientsContainer, FavoriteButton } from '../../components';
import { updateLocalStorage }
  from '../../services/localStorageService';
import { verifyItemInFavorite } from '../../services/functionsApi';
import shareIcon from '../../images/shareIcon.svg';

function MealsInProgress() {
  const { id } = useParams();
  const { disableButton, setFavoriteRecipe } = useContext(Context);
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    setFavoriteRecipe(verifyItemInFavorite(id));
    getData();
  }, [id, setFavoriteRecipe]);

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

  const { strMealThumb, strMeal, strCategory, strInstructions } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button" onClick={ share }>
        <img src={ shareIcon } alt="share icon" />
      </button>

      <FavoriteButton data={ data } id={ id } query="Meal" />

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
