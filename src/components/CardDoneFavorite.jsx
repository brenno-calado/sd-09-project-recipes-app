import React from 'react';
import { shape, string, number } from 'prop-types';
import { useLocation } from 'react-router-dom';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';

export default function CardDoneFavorite({ data, index }) {
  const { id, type, area, category, alcoholicOrNot, name, image } = data;
  const date = 'x';

  const { pathname } = useLocation();

  return (
    <section>
      <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          type === 'comida'
            ? `${area} - ${category}` : alcoholicOrNot
        }
      </p>
      <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      {
        pathname.includes('receitas-feitas')
        && <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em: ${date}`}</p>
      }
      <ShareButton category={ category } id={ id } />
      {
        pathname.includes('receitas-favoritas') && <LikeButton recipeDetails={ data } />
      }
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
