import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchApi from '../../services';
import * as S from './styled';
import {
  pathName,
  ingredientsArray,
  measureArray,
  copyLInk,
  sources,
  sourcesRecomendations,
} from './services';

const recomendationDefaultLength = 6;

export default function Details({ match: { params, url } }) {
  const [details, setDetails] = useState(null);
  const [recomendation, setRecomendation] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const { id } = params;

  const {
    typePath,
    selectorPath,
    recomendationPath,
    recomendationName,
  } = pathName(url);

  useEffect(() => {
    fetchApi(typePath, 'details', id).then((res) => setDetails(res[selectorPath][0]));
  }, [id, typePath, selectorPath]);

  useEffect(() => {
    fetchApi(recomendationPath, 'name', '').then((res) => {
      const recomentation = res[recomendationName]
        .filter((item) => res[recomendationName]
          .indexOf(item) < recomendationDefaultLength);
      setRecomendation(recomentation);
    });
  }, [recomendationPath, recomendationName, selectorPath]);

  const redirectToProgrecessPage = () => {
    setShouldRedirect(true);
  };

  const handleCopy = () => {
    copyLInk(`http://localhost:3000${url}`, setCopyLink);
  };

  if (shouldRedirect) {
    return (
      (typePath === 'food') ? <Redirect to={ `/comidas/${id}/in-progress` } />
        : <Redirect to={ `/bebidas/${id}/in-progress` } />
    );
  }
  return (
    <S.Container>
      <S.ThumbNail
        src={ sources('strMealThumb', 'strDrinkThumb', details, typePath) }
        alt="recipe"
        data-testid="recipe-photo"
      />

      <S.TitleContainer>
        <h1
          data-testid="recipe-title"
        >
          { sources('strMeal', 'strDrink', details, typePath) }
        </h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleCopy }
          >
            {copyLink ? 'Link copiado!' : 'Share'}
          </button>
          <button type="button" data-testid="favorite-btn">favorite</button>
        </div>
      </S.TitleContainer>
      <h3 data-testid="recipe-category">
        { details && ((typePath === 'food')
          ? details.strCategory : details.strAlcoholic) }
      </h3>
      <ul>
        <h4>Ingredients:</h4>
        {
          details && ingredientsArray(details).map((item, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { measureArray(details)[index] }
              &nbsp;
              <strong>{ item }</strong>
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{ details && details.strInstructions}</p>
      {
        (typePath === 'food') && <iframe
          src={ details && details.strYoutube }
          data-testid="video"
          title="video"
        />
      }
      <S.RecomendationContainer>
        {
          recomendation && recomendation.map((recipe, index) => (
            <S.Card key={ index } data-testid={ `${index}-recomendation-card` }>
              <img
                src={ sourcesRecomendations('strMealThumb', 'strDrinkThumb', recipe) }
                alt="recomendations"
              />
              <h3 data-testid={ `${index}-recomendation-title` }>
                { sourcesRecomendations('strMeal', 'strDrink', recipe, typePath)}
              </h3>
            </S.Card>
          ))
        }
      </S.RecomendationContainer>
      <S.StartButton
        onClick={ redirectToProgrecessPage }
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </S.StartButton>
    </S.Container>
  );
}

Details.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

Details.defaultProps = {
  id: '52832',
};
