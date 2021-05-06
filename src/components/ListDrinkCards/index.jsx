import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styled';

const MAX_ITENS = 12;

function ListCards(props) {
  const renderCards = () => {
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <S.Card key={ item.idDrink } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/bebidas/${item.idDrink}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <h1 data-testid={ `${index}-card-name` }>{item.strDrink}</h1>
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

export default ListCards;
