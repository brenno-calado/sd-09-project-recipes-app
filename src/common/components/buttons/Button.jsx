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

Button.defaultProps = {
  children: undefined,
  onClick: undefined,
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
