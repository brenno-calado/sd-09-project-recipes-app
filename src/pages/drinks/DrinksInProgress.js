import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { IngredientsContainer } from '../../components';
import { updateLocalStorage } from '../../services/localStorageService';
import { verifyItemInFavorite } from '../../services/functionsApi';
import HeaderDetails from '../../components/HeaderDetails';
import '../../css/RecipeInProgress.css';

function DrinksInProgress() {
  const { id } = useParams();
  const { disableButton, setFavoriteRecipe, updateData, data } = useContext(Context);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => updateData(fetchRecipeDetails(id, false));
    setFavoriteRecipe(verifyItemInFavorite(id));
    getData();
  }, [id, setFavoriteRecipe, updateData]);

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

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">

      <HeaderDetails
        querys={ ['cocktails', 'Drink'] }
        isMealPage={ false }
        setCopy={ setCopy }
      />

      <IngredientsContainer data={ data } />

      <section className="wrapper-instructions-in-progress">
        <h3 className="title-section">Instruções</h3>
        <p
          data-testid="instructions"
          className="instructions-paragraph"
        >
          {data.strInstructions}
        </p>
      </section>

      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn-recipe"
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
