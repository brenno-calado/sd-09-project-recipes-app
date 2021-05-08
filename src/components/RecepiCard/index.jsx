import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './recipesCard.module.css';

function RecipeCard({
  image, name, recipeCArdId, cardImageId, cardNameId, type, codeId }) {
  return (
    <Link to={ `/${type}/${codeId}` }>
      <li data-testid={ recipeCArdId } className={ styles.recipeCArdId }>
        <img
          data-testid={ cardImageId }
          src={ image }
          alt={ name }
          className={ styles.recipeCArdId }
          type={ type }
        />
        <p data-testid={ cardNameId }>{ name }</p>
      </li>
    </Link>
  );
}

RecipeCard.propTypes = {
  image: string,
  name: string,
  recipeCArdId: string,
  cardImageId: string,
  cardNameId: string,
  type: string,
  codeId: string,
};

RecipeCard.defaultProps = {
  image: '',
  name: '',
  recipeCArdId: '',
  cardImageId: '',
  cardNameId: '',
  type: '',
  codeId: '',
};

export default RecipeCard;
