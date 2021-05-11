import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from './Image';
import ShareButton from './ShareButton';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import getRecipeDetailsPath from '../services/getPath';

const renderTags = (index, tags) => (
  tags.map((tagName) => (
    <span
      key={ `${index}-${tagName}` }
      data-testid={ `${index}-${tagName}-horizontal-tag` }
    >
      { tagName }
    </span>
  )));

const RecipeListCard = ({ recipe, index, isDonePage, favCallback }) => {
  const isFood = recipe.type === 'comida';

  const detailsPath = getRecipeDetailsPath(recipe.id, isFood);
  const history = useHistory();
  const goToRecipe = (() => history.push(detailsPath));

  const recipeImageParams = {
    src: recipe.image,
    alt: 'Imagem da receita',
    width: '150px',
    'data-testid': `${index}-horizontal-image`,
    onClick: () => goToRecipe(),
  };

  const shareButtonParams = {
    isFoodPage: isFood,
    index,
    recipeId: recipe.id,
    testId: `${index}-horizontal-share-btn`,
  };

  const favIconParams = {
    src: BlackHeartIcon,
    alt: 'Favoritar receita',
    'data-testid': `${index}-horizontal-favorite-btn`,
    onClick: () => {
      favCallback(recipe);
    },
  };

  return (
    <div className="list-card">
      <div>
        <Image params={ recipeImageParams } />
      </div>
      <div>
        <span data-testid={ `${index}-horizontal-top-text` }>
          { recipe.alcoholicOrNot || `${recipe.area} - ${recipe.category}` }
        </span>
        <div
          role="button"
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => goToRecipe() }
          tabIndex={ index }
          onKeyPress={ ({ key }) => {
            if (key === 'Enter') goToRecipe();
          } }
        >
          { recipe.name }
        </div>
        { isDonePage && (
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
        ) }
        { isFood && <p>{ recipe.area }</p> }
        { isDonePage && isFood && renderTags(index, recipe.tags) }
        <ShareButton { ...shareButtonParams } />
        { !isDonePage && <Image params={ favIconParams } /> }
      </div>
    </div>
  );
};

RecipeListCard.propTypes = {
  index: PropTypes.number.isRequired,
  favCallback: PropTypes.func.isRequired,
  isDonePage: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default RecipeListCard;
