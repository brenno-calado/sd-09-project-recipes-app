import { func, string } from 'prop-types';
import React from 'react';

function ButtonCategory({ title, onclick }) {
  return (
    <button
      type="button"
      data-testid={ `${title}-category-filter` }
      onClick={ () => onclick(title) }
    >
      { title }
    </button>
  );
}

ButtonCategory.propTypes = {
  title: string.isRequired,
  onclick: func.isRequired,
};

export default ButtonCategory;
