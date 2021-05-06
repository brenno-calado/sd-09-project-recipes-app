import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import fetchApi from '../../services';
import * as S from './styled';
import TitleContainer from './TitleContainer';
import {
  pathName,
  ingredientsArray,
  measureArray,
  sources,
  sourcesRecomendations,
} from './services';
import { updateLocalStorageItemInProgress } from '../../services/localStorage';
import { context } from '../../context';

export default function Details(props) {
  const [details, setDetails] = useState(null);
  const [recomendation, setRecomendation] = useState(null);
  const { setInProgressRecipes } = useContext(context);
  const [redirect, setRedirect] = useState(false);
  const {
    match: { params, path },
  } = props;

  const {
    typePath,
    selectorPath,
    recomendationPath,
    recomendationName,
  } = pathName(path);

  const { id } = params;

  const recomendationDefaultLength = 6;

  useEffect(() => {
    fetchApi(typePath, 'details', id).then((res) => setDetails(res[selectorPath][0]));
  }, [id, typePath, selectorPath]);

  useEffect(() => {
    fetchApi(recomendationPath, 'name', '').then((res) => {
      const recomentation = res[recomendationName].filter(
        (item) => res[recomendationName].indexOf(item) < recomendationDefaultLength,
      );
      setRecomendation(recomentation);
    });
  }, [recomendationPath, recomendationName, selectorPath]);

  const handleStart = () => {
    setRedirect(true);
    setInProgressRecipes((prevState) => {
      console.log(prevState);
      return path.includes('comida')
        ? updateLocalStorageItemInProgress('inProgressRecipes', {
          ...prevState,
          meals: {
            ...prevState.meals,
            [details.idMeal]: [],
          },
        })
        : updateLocalStorageItemInProgress('inProgressRecipes', {
          ...prevState,
          cocktails: {
            ...prevState.cocktails,
            [details.idDrink]: [],
          },
        });
    });
  };

  if (redirect) {
    return (
      <Redirect
        to={ `/comidas/${details.idMeal || details.idDrink}/in-progress` }
      />
    );
  }
  return (
    <S.Container>
      <S.ThumbNail
        src={ sources('strMealThumb', 'strDrinkThumb', details, typePath) }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <TitleContainer { ...props } item={ details } />
      <h3 data-testid="recipe-category">
        {details
          && (typePath === 'food' ? details.strCategory : details.strAlcoholic)}
      </h3>
      <ul>
        <h4>Ingredients:</h4>
        {details
          && ingredientsArray(details).map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {measureArray(details)[index]}
              &nbsp;
              <strong>{item}</strong>
            </li>
          ))}
      </ul>
      <p data-testid="instructions">{details && details.strInstructions}</p>
      {typePath === 'food' && (
        <iframe
          src={ details && details.strYoutube }
          data-testid="video"
          title="video"
        />
      )}
      <S.RecomendationContainer>
        {recomendation
          && recomendation.map((recipe, index) => (
            <S.Card key={ index } data-testid={ `${index}-recomendation-card` }>
              <img
                src={ sourcesRecomendations(
                  'strMealThumb',
                  'strDrinkThumb',
                  recipe,
                  typePath,
                ) }
                alt="recomendations"
              />
              <h3 data-testid={ `${index}-recomendation-title` }>
                {sourcesRecomendations('strMeal', 'strDrink', recipe, typePath)}
              </h3>
            </S.Card>
          ))}
      </S.RecomendationContainer>
      <S.StartButton
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStart }
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
    path: PropTypes.string.isRequired,
  }).isRequired,
};

Details.defaultProps = {
  id: '52832',
};
