import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Copy from 'clipboard-copy';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { fetchApi } from '../services/api';

const RecipeProgress = ({ match: { params } }) => {
  // <Link to={ `/comidas/${id}/in-progress` }>Progress</Link>
  const index = 1;
  const { id } = params;
  const history = useHistory();
  const [isFavorite, setFavorite] = useState(false);
  const [recipe, setRecipe] = useState(false);
  const location = useLocation();
  const isFoodsPage = location.pathname.includes('comida');
  // const foodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  // const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchById = async () => {
      const fetchDetails = await fetchApi({ i: id, isDetails: true, isFoodsPage });
      const key = Object.keys(fetchDetails)[0];
      return fetchDetails[key]['0'];
    };
    fetchById().then((recipeResponse) => setRecipe(recipeResponse));
  }, []);
  if (!recipe) {
    return <div>Carregando</div>;
  }
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        alt="recipePhoto"
      />
      <h1 data-testid="recipe-title">{index}</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          Copy(`http://localhost:3000/comidas/${index}`);
          // inProgressRecipes
        } }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button
        type="button"
        onClick={ () => setFavorite(!isFavorite) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteIcon"
        />
      </button>
      <h4 data-testid="recipe-category">{index}</h4>
      <h2>Ingredientes</h2>
      <ul>
        <li data-testid={ `${id}-ingredient-step` }>
          <label htmlFor="ingredient">
            <input
              id={ index }
              type="checkbox"
              name=""
              value=""
              // onClick={ handleClick }
              // checked={ inputChecked(index) }
            />
          </label>
        </li>
      </ul>
      <h2>Instruções</h2>
      <p data-testid="instructions">{index}</p>
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        // disabled={ verifyCheck }
        // onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      <Footer />
    </>
  );
};

export default RecipeProgress;

RecipeProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.string,
  }).isRequired,
};
