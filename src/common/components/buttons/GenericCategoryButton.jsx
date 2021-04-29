import React from 'react';

function GenericCategoryButton(props) {
  return (
    <button
      data-testid={ `${ props.buttonLabel }-category-filter` }
      onClick={ () => props.action(props.buttonLabel) }
    >
      { props.buttonLabel }
    </button>
  );
}

export default GenericCategoryButton;
