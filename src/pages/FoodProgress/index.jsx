import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchApi from '../../services';
import * as S from '../../components/Details/styled';
import TitleContainer from '../../components/Details/TitleContainer';
import {
  pathName,
  ingredientsArray,
  measureArray,
  sources,
} from '../../components/Details/services';

export default function FoodProgress(props) {
  const data = new Date();
  const dataToday = `${data.getDay()}/${data.getDay()}/${data.getDay()}`;
  console.log(dataToday);
  const [details, setDetails] = useState(null);
  const [counter, setCounter] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const {
    match: { params, path },
  } = props;

  const { typePath, selectorPath } = pathName(path);

  const { id } = params;

  useEffect(() => {
    fetchApi(typePath, 'details', id).then((res) => setDetails(res[selectorPath][0]));
  }, [id, typePath, selectorPath]);

  const handle = ({ target }) => {
    if (target.checked) {
      setCounter(counter + 1);
    } else {
      setCounter(counter - 1);
    }
  };

  const doneRecipe = () => {
    // const recipeFinished = {
    //   id: '',
    //   type: comida-ou-bebida,
    //   area: area-da-receita-ou-texto-vazio,
    //   category: categoria-da-receita-ou-texto-vazio,
    //   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio
    //   name: nome-da-receita,
    //   image: imagem-da-receita,
    //   doneDate: quando-a-receita-foi-concluida,
    //   tags: array-de-tags-da-receita-ou-array-vazio,
    // }

    setRedirect(true);
    // Aqui tem que ser atualizado;
  };

  console.log(details);
  console.log(data.toDateString());

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
            <label
              key={ index }
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                id={ index }
                type="checkbox"
                onClick={ handle }
              />
              {measureArray(details)[index]}
              &nbsp;
              <strong>{item}</strong>
            </label>
          ))}
      </ul>
      <p data-testid="instructions">{details && details.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ ((ingredientsArray(details) === null
          ? '' : (ingredientsArray(details).length) !== counter)) }
        onClick={ doneRecipe }
      >
        Finalizar Receita
      </button>
      { redirect && <Redirect to="/receitas-feitas" /> }
    </S.Container>
  );
}

FoodProgress.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string.isRequired,
  }).isRequired,
};
