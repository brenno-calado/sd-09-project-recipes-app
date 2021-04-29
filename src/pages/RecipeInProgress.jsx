import React, { useEffect, useState } from 'react';
import { string, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItemById } from '../actions/itemById';
import RecipeList from '../components/RecipeList';
import ShareAndFavo from '../components/ShareAndFavo';
import { handleDone } from '../services/localStorage';

function FoodInProgress(
  { match: { path, params, url }, setItem, item, loading, checks },
) {
  const [disable, setDisable] = useState();

  useEffect(() => {
    const initialLocal = { meals: {}, cocktails: {} };
    const checkDisable = () => {
      const local = (JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      ) || false);
      if (!local) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(initialLocal));
        setDisable(true);
      }
    };
    checkDisable();
  }, []);

  useEffect(() => {
    if (!Object.values(checks).length < 1) {
      setDisable(!Object.values(checks).every((check) => check));
    } else {
      setDisable(true);
    }
  }, [checks]);

  useEffect(() => {
    setItem(params.id, path);
  }, [setItem, params, path]);

  if (loading) return <h3>Loading...</h3>;
  if (!item) return <h3>Loading....</h3>;

  const type = path.includes('/comidas') ? 'meals' : 'drinks';
  const query = path.includes('/comidas') ? 'Meal' : 'Drink';
  const recipe = item[type][0];
  const newType = type === 'meals' ? type : 'cocktails';
  const MAX_URL = -12;
  const newUrl = url.slice(0, MAX_URL);

  return (
    <div>
      <img
        src={ recipe[`str${query}Thumb`] }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ recipe[`str${query}`] }</h2>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
      <ShareAndFavo match={ { path, params, url: newUrl } } recipe={ recipe } />
      <RecipeList item={ recipe } type={ newType } query={ query } />
      <p data-testid="instructions">{ recipe.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disable }
          onClick={ () => handleDone(recipe, query) }
        >
          Finalizar
        </button>
      </Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setItem: (id, path) => dispatch(getItemById(id, path)),
});

const mapStateToProps = (state) => ({
  item: state.setItem.item,
  loading: state.setItem.loading,
  checks: state.setChecks.checks,
});

FoodInProgress.propTypes = {
  setItem: func,
  item: object,
  loading: bool,
  path: string,
  params: object,
  checks: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodInProgress);
