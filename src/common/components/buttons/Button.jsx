import React from 'react';

function Button(props) {
  const { children, onClick, testId, copiedOrFav, image } = props;
  return (
    <button
      type="button"
      className="share-like-btn"
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

export default Button;
