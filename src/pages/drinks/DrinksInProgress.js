import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { updateLocalStorage } from '../../services/localStorageService';
import { addToFavorite, removeToFavorite,
  verifyItemInFavorite } from '../../services/functionsApi';
import IngredientsContainer from '../../components/IngredientsContainer';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinksInProgress() {
  const { id } = useParams();
  const { disableButton } = useContext(Context);
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    setFavoriteRecipe(verifyItemInFavorite(id));
    getData();
  }, [id]);

  const handleClick = () => {
    const doneRecipe = {
      id,
      type: 'bebida',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: data.strTags ? data.strTags.split(',') : [],
    };
    updateLocalStorage('doneOrFavoriteRecipes', 'doneRecipes', doneRecipe);
    setShouldRedirect(true);
  };

  const share = () => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}/bebidas/${id}`);
    setCopy(true);
  };

  const favorite = () => {
    if (!favoriteRecipe) {
      addToFavorite('drinks', data);
    } else {
      removeToFavorite(id);
    }
    setFavoriteRecipe(!favoriteRecipe);
  };

  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
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
      <p data-testid="recipe-category">{ strAlcoholic }</p>

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

export default DrinksInProgress;
