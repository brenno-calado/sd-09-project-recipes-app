import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../../context';
import IngredientsCardContainer from './styled';

const MAX_ITENS = 12;

function ListIngredientsCards(props) {
  const { setIngreditOn } = useContext(context);

  const renderCards = () => {
    let link = '';
    let option = '';
    let drinkOrFood = '';

    if (Object.keys(props.items[0])[0] === 'idIngredient') {
      link = 'https://www.themealdb.com/images/ingredients/';
      option = 'strIngredient';
      drinkOrFood = 'comidas';
    } else {
      link = 'https://www.thecocktaildb.com/images/ingredients/';
      option = 'strIngredient1';
      drinkOrFood = 'bebidas';
    }

    function choiceItem(name) {
      setIngreditOn(name);
    }

    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <div key={ item[option] } data-testid={ `${index}-ingredient-card` }>
          <IngredientsCardContainer>
            <Link to={ `/${drinkOrFood}` } onClick={ () => choiceItem(item[option]) }>
              <span data-testid={ `${index}-card-name` }>{item[option]}</span>
              <img
                data-testid={ `${index}-card-img` }
                src={ `${link}${item[option]}-Small.png` }
                alt={ item[option] }
              />
            </Link>
          </IngredientsCardContainer>
        </div>
      )));
    return cards;
  };

  return props.items && renderCards();
}

export default ListIngredientsCards;
