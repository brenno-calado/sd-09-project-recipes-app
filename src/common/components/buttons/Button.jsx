import React from 'react';
import PropTypes from 'prop-types';
function Button(props) {
  const { children, onClick } = props;
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
