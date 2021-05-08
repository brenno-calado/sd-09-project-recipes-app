import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compareHearths } from '../helpers/index';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './Recipes.css';

function Recipes(props) {
  const [copySuccess, setCopySuccess] = useState('');
  const { hearthIco, setHearthIco } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;
  const {
    thumb, category,
    ingredientsList, measureList,
    recipeTitle, recipeInstruction,
    recipe,
    route,
    id,
  } = props;

  const shareRecipe = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Link copiado!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  function changeButtonHearth() {
    if (hearthIco === false) {
      setHearthIco(true);
    } else if (hearthIco === true) {
      setHearthIco(false);
    }
  }

  return (
    <div className="details-container">
      <div className="img-container">
        <img src={ thumb } alt="food" data-testid="recipe-photo" className="img-thumb" />
      </div>
      <div className="recipes-title">
        <h1 data-testid="recipe-title">{recipeTitle}</h1>
        <div className="btn-social">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe(`http://localhost:3000${pathname}`) }
          >
            <img src={ shareIcon } alt="food" />
          </button>
          {copySuccess}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => { compareHearths(recipe, route, id); changeButtonHearth(); } }
            src={ !hearthIco ? whiteHeartIcon : blackHeartIcon }
          >
            <img
              src={ !hearthIco ? whiteHeartIcon : blackHeartIcon }
              alt="food"
            />
          </button>
        </div>
      </div>
      <div>
        <h3 data-testid="recipe-category">{ category }</h3>
      </div>
      <div>
        <h4>Lista de Ingredientes</h4>
        <ul>
          { ingredientsList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { `${ingredient} (${measureList[index] ? measureList[index] : ''})` }
            </li>
          ))}
        </ul>
      </div>
      <div className="instruction-container">
        <h2>Modo de Preparo:</h2>
        <p
          data-testid="instructions"
          className="instructions-text"
        >
          {recipeInstruction}
        </p>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  thumb: PropTypes.object,
  category: PropTypes.string,
  ingredientsList: PropTypes.func,
  measureList: PropTypes.func,
}.isRequired;

export default Recipes;
