import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styled';

const MAX_ITENS = 12;

function ListCards(props) {
  const { match: { path } } = props;

  const typePath = path.includes('comidas') ? 'Meal' : 'Drink';

  const renderCards = () => {
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <S.Card key={ item.id`${typePath}` } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${item.id`${typePath}`}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.str`${typePath}Thumb` }
              alt={ item.str`${typePath}` }
            />
            <h1 data-testid={ `${index}-card-name` }>{item.str`${typePath}`}</h1>
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
