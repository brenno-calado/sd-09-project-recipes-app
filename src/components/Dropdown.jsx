import React from 'react';
import { arrayOf, shape } from 'prop-types';

export default function Dropdown({ data }) {
  return (
    <select name="area" id="recipe-area" data-testid="explore-by-area-dropdown">
      <option value="">All</option>
    </select>
  );
}

Dropdown.propTypes = {
  data: arrayOf(shape()),
}.isRequired;
