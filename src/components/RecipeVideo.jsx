import React from 'react';
import PropTypes from 'prop-types';
import { getPageFromURL, getYouTubeLink } from '../services/others';

function RecipeVideo({ detailsContext }) {
  const { recipe } = detailsContext;

  if (getPageFromURL()) {
    return (
      <iframe
        data-testid="video"
        title="video"
        width="700"
        height="500"
        src={ getYouTubeLink(recipe) }
        allow="autoplay; encrypted-media"
      />
    );
  }
  return '';
}

RecipeVideo.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default RecipeVideo;
