import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';
import Recommendations from '../components/Recommendations';

import { fetchDrinkRecipeDetails, fetchMealRecipeDetails } from '../actions';

class MealDetails extends React.Component {
  constructor(props) {
    super(props);
    const { details, seekTheseDetails } = props;
    if (!details) {
      seekTheseDetails();
    }
  }

  render() {
    const { details = {}, type } = this.props;
    return ((_.isEmpty(details))
      ? (
        <>
          <h1 style={ { textAlign: 'center' } }>Carregando...</h1>
          <Recommendations type={ type } />
        </>
      ) : (
        <div>
          <img
            alt="Recipe"
            src={ details.strMealThumb || details.strDrinkThumb }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{details.strMeal || details.strDrink}</h1>
          <p data-testid="recipe-category">{`Categoria: ${details.strCategory}`}</p>
          details.strAlcoholic &&
          <p>{details.strAlcoholic}</p>
          <h2>Ingredients:</h2>
          <ul>
            {
              Array.from({ length: 20 }, (__, index) => `strIngredient${index + 1}`)
                .map((strIngredient, index) => (
                  (details[strIngredient]
                    && (
                      <li
                        key={ index }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {details[strIngredient]}
                      </li>
                    )
                  ) || null))
            }
          </ul>
          <h2>Instructions:</h2>
          {
            (details.strInstructions
            && details.strInstructions.split('\n').map((paragraph, index) => (
              paragraph
              && <p data-testid="instructions" key={ index }>{ paragraph }</p>))) || null
          }
          {
            (details.strYoutube
              && (
                <div data-testid="video">
                  <YouTube videoId={ getVideoId(details.strYoutube) } />
                </div>)) || null
          }
          <div className="details-buttons">
            <button
              data-testid="share-btn"
              type="button"
            >
              Compartilhar
            </button>
            <button
              data-testid="favorite-btn"
              type="button"
            >
              Favoritar
            </button>
            <button
              data-testid="start-recipe-btn"
              type="button"
            >
              Começar a receita
            </button>
          </div>
          <Recommendations type={ type } />
        </div>
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { id } }, type } = ownProps;
  return (type === 'meals') ? {
    details: state.mealRecipeDetails[id],
  } : {
    details: state.drinkRecipeDetails[id],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  seekTheseDetails: () => {
    const { match: { params: { id } }, type } = ownProps;
    if (type === 'meals') dispatch(fetchMealRecipeDetails(id));
    else dispatch(fetchDrinkRecipeDetails(id));
  },
});

MealDetails.propTypes = {
  details: PropTypes.objectOf,
  seekTheseDetails: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

MealDetails.defaultProps = {
  details: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
