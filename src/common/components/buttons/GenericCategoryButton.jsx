import React from 'react';
import PropTypes from 'prop-types';

function GenericCategoryButton({ buttonLabel, action }) {
  return (
    <button
      type="button"
      data-testid={ `${buttonLabel}-category-filter` }
      onClick={ () => action(buttonLabel) }
    >
      { buttonLabel }
    </button>
  );
}

GenericCategoryButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default GenericCategoryButton;
