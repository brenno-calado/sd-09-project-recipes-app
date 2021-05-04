import React from 'react';
import PropTypes from 'prop-types';
import { getPageFromURL, getYouTubeLink } from '../services/others';
import './RecipeVideo.css';

function RecipeVideo({ detailsContext }) {
  const { recipe } = detailsContext;

  if (getPageFromURL()) {
    return (
      <section>
        <div className="video-container">
          <iframe
            className="video-frame"
            data-testid="video"
            title="video"
            src={ getYouTubeLink(recipe) }
            allow="autoplay; encrypted-media"
          />
        </div>
      </section>
    );
  }
  return '';
}

RecipeVideo.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default RecipeVideo;
