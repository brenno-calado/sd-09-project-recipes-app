import React from 'react';
import { string } from 'prop-types';
import styles from './recipesCard.module.css';

function RecipeCard({ image, name, recipeCArdId, cardImageId, cardNameId }) {
  return (
    <li data-testid={ recipeCArdId } className={ styles.recipeCArdId }>
      <img
        data-testid={ cardImageId }
        src={ image }
        alt={ name }
        className={ styles.recipeCArdId }
      />
      <p data-testid={ cardNameId }>{ name }</p>
    </li>
  );
}

RecipeCard.propTypes = {
  image: string,
  name: string,
  recipeCArdId: string,
  cardImageId: string,
  cardNameId: string,
};

RecipeCard.defaultProps = {
  image: '',
  name: '',
  recipeCArdId: '',
  cardImageId: '',
  cardNameId: '',
};

export default RecipeCard;
