import React from 'react';
import { shape, string, number } from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';
import '../styles/CardDoneFavorite.css';

export default function CardDoneFavorite({ data, index }) {
  const { id, type, area, category, alcoholicOrNot, name, image } = data;
  const date = 'x';

  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <section className="card-done">
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        className="card-done__image"
        onClick={ () => history.push(`/${type.concat('s')}/${id}`) }
        aria-hidden="true"
      />
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'comida'
              ? `${area} - ${category}` : alcoholicOrNot
          }
        </p>
        <h2
          data-testid={ `${index}-horizontal-name` }
          className="card-done__name"
          onClick={ () => history.push(`/${type.concat('s')}/${id}`) }
          aria-hidden="true"
        >
          {name}
        </h2>
        {
          pathname.includes('receitas-feitas')
        && <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em: ${date}`}</p>
        }
      </div>
      <div className="card-done__buttons">
        <ShareButton
          category={ type }
          id={ id }
          index={ index }
        />
        {
          pathname.includes('receitas-favoritas')
        && <LikeButton
          recipeDetails={ data }
          index={ index }
        />
        }
      </div>
    </section>
  );
}

CardDoneFavorite.propTypes = {
  data: shape({
    id: string,
    type: string,
    area: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
  }),
  index: number,
}.isRequired;