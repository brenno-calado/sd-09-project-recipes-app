import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FavoriteButton = (props) => {
  const { onClick, isFavorite } = props;
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite Button"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default FavoriteButton;
