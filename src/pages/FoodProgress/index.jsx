import React, { useEffect, useState } from 'react';
import fetchApi from '../../services';
import * as S from '../../components/Details/styled';
import TitleContainer from '../../components/Details/TitleContainer';
import {
  pathName,
  ingredientsArray,
  measureArray,
  sources,
  sourcesRecomendations,
} from '../../components/Details/services';

export default function FoodProgress(props) {
  const [details, setDetails] = useState(null);
  const [recomendation, setRecomendation] = useState(null);

  const {
    match: { params, path },
  } = props;

  const { typePath, selectorPath } = pathName(path);

  const { id } = params;

  useEffect(() => {
    fetchApi(typePath, 'details', id).then((res) => setDetails(res[selectorPath][0]));
  }, [id, typePath, selectorPath]);

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
        onClick=""
      >
        Iniciar Receita
      </S.StartButton>
    </S.Container>
  );
}
