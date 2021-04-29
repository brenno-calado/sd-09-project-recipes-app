import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

export default function RecipeList({ listItems }) {
  return (
    <ul>
      { listItems.map((item, index) => (
        <li key={ index }>
          <RecipeCard index={ index } thumbUrl={ item.thumbUrl } name={ item.name } />
        </li>))}
    </ul>
  );
}

RecipeList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
