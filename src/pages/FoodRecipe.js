import React from 'react';
import { shape, string } from 'prop-types';

function FoodRecipe(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  return (
    <h1>
      Detalhes da receita
      { id }
    </h1>
  );
}

FoodRecipe.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

FoodRecipe.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default FoodRecipe;
