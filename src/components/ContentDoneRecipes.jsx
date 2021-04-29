import React from 'react';

import shareIcon from '../images/shareIcon.svg';
import '../css/components/ContentDoneRecipes.css';

function ContentDoneRecipes() {
  const data = [
    {
      id: 52846,
      type: comida,
      area: 'Japanese',
      category: 'Chicken',
      alcoholicOrNot: '',
      name: 'Chicken & mushroom Hotpot',
      image: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
      doneDate: '2016-08-18',
      tags: ['bun', 'baking'],
    },
    {
      id: 11007,
      type: 'bebida',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'Margarita',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"',
      doneDate: '2015-08-14',
      tags: ['bun', 'baking'],
    },
  ];
  return (
    <div className="done-recipes-card">
      <img
        className="thumbnail"
        src="https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg"
        alt=""
        data-testid="${index}-horizontal-image"
      />
      <section>
        <div>
          <div data-testid="${index}-horizontal-top-text">
            {/* Alcoholic(bebida) || type(comida) */}
            bebida
          </div>
          {/* icone compartilhar */}
          <img src={ shareIcon } alt="Share Icon" />
        </div>
        <h4>Chelsea Buns</h4>
        <span>Feita em: 10/06/2019</span>
        <div>
          {/* tags */}
          <span className="done-recipes-tags">xablau</span>
        </div>
      </section>
    </div>
  );
}

export default ContentDoneRecipes;
