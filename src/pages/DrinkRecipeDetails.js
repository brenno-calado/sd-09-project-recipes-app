import React from 'react';
import { shape, string } from 'prop-types';

function DrinkRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  return (
    <h1>
      Detalhes de receita de bebidas
      {' '}
      {id}
    </h1>
  );
}

DrinkRecipeDetails.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

DrinkRecipeDetails.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default DrinkRecipeDetails;
