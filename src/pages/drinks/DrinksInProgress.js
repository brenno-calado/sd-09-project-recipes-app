import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { IngredientsContainer } from '../../components';
import { updateLocalStorage } from '../../services/localStorageService';
import { verifyItemInFavorite } from '../../services/functionsApi';
import HeaderDetails from '../../components/HeaderDetails';

function DrinksInProgress() {
  const { id } = useParams();
  const { disableButton, setFavoriteRecipe } = useContext(Context);
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    setFavoriteRecipe(verifyItemInFavorite(id));
    getData();
  }, [id, setFavoriteRecipe]);

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

  const { strInstructions } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">

      <HeaderDetails querys={ ['cocktails', 'Drink'] } isMealPage setCopy={ setCopy } />

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
