import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Image from './Image';
import ShareIcon from '../images/shareIcon.svg';
// import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

const renderTags = (index, tags) => (
  tags.map((tagName) => (
    <span
      key={ `${index}-${tagName}` }
      data-testid={ `${index}-${tagName}-horizontal-tag` }
    >
      { tagName }
    </span>
  )));

const RecipeListCard = ({ recipe, index, copyCallback, isDonePage, favCallback }) => {
  const isFood = recipe.type === 'comida';

  const path = recipe.alcoholicOrNot ? '/bebidas/' : '/comidas/';
  const recipePath = `${path}${recipe.id}`;
  const history = useHistory();
  const goToRecipe = (() => history.push(recipePath));

  const recipeImageParams = {
    src: recipe.image,
    alt: 'Imagem da receita',
    width: '150px',
    'data-testid': `${index}-horizontal-image`,
    onClick: () => goToRecipe(),
  };

  const shareIconParams = {
    src: ShareIcon,
    alt: 'Compartilhar receita',
    'data-testid': `${index}-horizontal-share-btn`,
    onClick: () => {
      const domain = window.location.origin;
      const detailUrl = `${domain}${recipePath}`;
      const removeTimeout = 2000;
      copy(detailUrl);
      copyCallback();
      setTimeout(() => copyCallback(), removeTimeout);
    },
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
          onKeyPress={ ({ target: { key } }) => {
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
        <Image params={ shareIconParams } />
        { !isDonePage && <Image params={ favIconParams } /> }
      </div>
    </div>
  );
};

RecipeListCard.propTypes = {
  index: PropTypes.number.isRequired,
  copyCallback: PropTypes.func.isRequired,
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
