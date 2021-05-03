import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styled';

const MAX_ITENS = 12;

function ListFoodCards(props) {
  const renderCards = () => {
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <S.Card key={ item.idMeal } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${item.idMeal}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <h1 data-testid={ `${index}-card-name` }>{item.strMeal}</h1>
          </Link>
        </S.Card>
      )));

    return (
      <S.CardContainer>
        { cards }
      </S.CardContainer>
    );
  };

  return props.items && renderCards();
}

export default ListFoodCards;
