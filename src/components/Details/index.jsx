import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../../services';
import * as S from './styled';
import TitleContainer from './TitleContainer';

const pathName = (path) => ({
  typePath: path.includes('comidas') ? 'food' : 'cocktail',
  selectorPath: path.includes('comidas') ? 'meals' : 'drinks',
  recomendationPath: path.includes('comidas') ? 'cocktail' : 'food',
  recomendationName: path.includes('comidas') ? 'drinks' : 'meals',
});

export default function Details(props) {
  const [details, setDetails] = useState(null);
  const [recomendation, setRecomendation] = useState(null);
  const { match: { params, path } } = props;

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

  const ingredientsArray = details
    && Object.keys(details)
      .filter((ingredientKey) => ingredientKey.includes('strIngredient'))
      .map((strIngredients) => details[strIngredients])
      .filter((ingredient) => ingredient);

  const measureArray = details
    && Object.keys(details)
      .filter((measureKey) => measureKey.includes('strMeasure'))
      .map((strMeasures) => details[strMeasures])
      .filter((measure) => measure);

  const sources = (meal, drink) => details && (
    typePath === 'food' ? details[meal] : details[drink]);

  const sourcesRecomendations = (meal, drink, recipe) => (
    typePath === 'food' ? recipe[drink] : recipe[meal]);

  return (
    <S.Container>
      <S.ThumbNail
        src={ sources('strMealThumb', 'strDrinkThumb') }
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
          && ingredientsArray.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {measureArray[index]}
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
                ) }
                alt="recomendations"
              />
              <h3 data-testid={ `${index}-recomendation-title` }>
                {sourcesRecomendations('strMeal', 'strDrink', recipe)}
              </h3>
            </S.Card>
          ))}
      </S.RecomendationContainer>
      <S.StartButton type="button" data-testid="start-recipe-btn">
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
