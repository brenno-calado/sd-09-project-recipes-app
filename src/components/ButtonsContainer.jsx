import React from 'react';
import { shape, string } from 'prop-types';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

export default function ButtonsContainer({ recipeDetails }) {
  const { type, id } = recipeDetails;

  return (
    <div>
      <LikeButton recipeDetails={ recipeDetails } />
      <ShareButton category={ type } id={ id } />
    </div>
  );
}

ButtonsContainer.propTypes = {
  recipeDetails: shape({
    type: string,
  }),
}.isRequired;
