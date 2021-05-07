import React, { useEffect, useState } from 'react';
import { string, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { getItemById } from '../actions/itemById';
import RecipeCheckboxes from '../components/RecipeCheckboxes';
import ShareAndFavo from '../components/ShareAndFavo';
import { handleDone } from '../services/localStorage';
import '../Style/RecipesInProgress.css';
import MealLoading from '../images/lf30_editor_oblwx6ru.json';
import DrinkLoading from '../images/lf30_editor_brwuobfm.json';

function RecipeInProgress(
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: path.includes('comidas') ? MealLoading : DrinkLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const type = path.includes('/comidas') ? 'meals' : 'drinks';

  if (loading || !item[type]) {
    return (
      <div className="animates">
        <Lottie
          options={ defaultOptions }
          height={ 400 }
          width={ 400 }
        />
      </div>
    );
  }

  const query = path.includes('/comidas') ? 'Meal' : 'Drink';
  const recipe = item[type][0];
  const newType = type === 'meals' ? type : 'cocktails';
  const MAX_URL = -12;
  const newUrl = url.slice(0, MAX_URL);
  const MAX_SLICE_YOUTUBE = 11;

  return (
    <div className="detailsPage">
      <img
        src={ recipe[`str${query}Thumb`] }
        alt="recipe"
        data-testid="recipe-photo"
        className="detailsImage"
      />
      <div className="headerDetails">
        <div className="detailsMainInfos">
          <h2
            data-testid="recipe-title"
            className="detailsTitle"
          >
            { recipe[`str${query}`] }
          </h2>
          <h2
            data-testid="recipe-category"
            className="detailsCategory"
          >
            {recipe.strAlcoholic || recipe.strCategory}
          </h2>
        </div>
        <div>
          <ShareAndFavo match={ { path, params, url: newUrl } } recipe={ recipe } />
        </div>
      </div>
      <h3 className="detailsSubtitle">Ingredientes</h3>
      <RecipeCheckboxes item={ recipe } type={ newType } query={ query } />
      <h3 className="detailsSubtitle">Instructions</h3>
      <div className="instructions">
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      { recipe.strYoutube && (
        <div>
          <h3 className="detailsSubtitle">Video</h3>
          <iframe
            width="560"
            className="progressVideo"
            height="315"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${recipe.strYoutube
              .slice(recipe
                .strYoutube.length - MAX_SLICE_YOUTUBE, recipe.strYoutube.length)}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay;
          clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) }
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="finishBtn"
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

RecipeInProgress.propTypes = {
  setItem: func,
  item: object,
  loading: bool,
  path: string,
  params: object,
  checks: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
