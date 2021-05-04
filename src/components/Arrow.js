import React from 'react';
import PropTypes from 'prop-types';

function Arrow({ clickFunction, glyph }) {
  return (
    <button
      type="button"
      onClick={ clickFunction }
    >
      { glyph }
    </button>
  );
}

Arrow.propTypes = {
  clickFunction: PropTypes.func.isRequired,
  glyph: PropTypes.string.isRequired,
};

export default Arrow;
