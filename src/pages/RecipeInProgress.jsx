import React, { useEffect } from 'react';
import { string, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { getItemById } from '../actions/itemById';
import RecipeList from '../components/RecipeList';

function FoodInProgress({ match: { path, params }, setItem, item, loading }) {
  useEffect(() => {
    setItem(params.id, path);
  }, [setItem, params, path]);

  if (loading) return <h3>Loading...</h3>;

  const type = path.includes('/comidas') ? 'meals' : 'drinks';
  const query = path.includes('/comidas') ? 'Meal' : 'Drink';
  const recipe = item && item[type][0];

  return (
    <div>
      <img
        src={ recipe[`str${query}Thumb`] }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ recipe[`str${query}`] }</h2>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <RecipeList item={ recipe } />
      <p data-testid="instructions">{ recipe.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setItem: (id, path) => dispatch(getItemById(id, path)),
});

const mapStateToProps = (state) => ({
  item: state.setItem.item,
  loading: state.setItem.loading,
});

FoodInProgress.propTypes = {
  setItem: func,
  item: object,
  loading: bool,
  path: string,
  params: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodInProgress);
