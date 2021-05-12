import React from 'react';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

import '../styles/card.css';

const CardFood = (recipeProps) => {
  const { recipe, indice: index } = recipeProps;
  let { type } = recipe;

  if (type === 'comida') {
    type = 'comidas';
  }
  if (type === 'bebida') {
    type = 'bebidas';
  }

  const copyLink = ({ target }) => {
    const url = `http://localhost:3000/${type}/${recipe.id}`;
    const inputTest = document.createElement('input');
    inputTest.value = url;
    document.body.appendChild(inputTest);
    inputTest.select();
    document.execCommand('copy');
    document.body.removeChild(inputTest);

    target.parentNode.classList.add('copiado');
    const timeDelayAnimation = 3000;
    setTimeout(() => target.parentNode.classList.remove('copiado'), timeDelayAnimation);
  };

  const btn = () => (
    <button
      className="share"
      type="button"
      onClick={ copyLink }
      onKeyDown={ copyLink }
    >
      <img
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      />
      <span>Link copiado!</span>
    </button>
  );

  const infoMeat = () => (
    <section>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${recipe.area} - ${recipe.category}` }
      </p>
      <a
        data-testid={ `${index}-horizontal-name` }
        href={ `http://localhost:3000/${type}/${recipe.id}` }
      >
        { recipe.name }
      </a>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </p>
      <div className="tags">
        {
          recipe.tags.map(
            (tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                { tag }
              </p>
            ),
          )
        }
      </div>
      {
        btn()
      }
    </section>
  );

  const infoDrink = () => (
    <section>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.alcoholicOrNot }
      </p>
      <Link
        to={ `/${type}/${recipe.id}` }
      >
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </p>
      </Link>
      <p>
        { recipe.area }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </p>
      {
        btn()
      }
    </section>
  );

  const infoComponet = () => {
    if (recipe.type === 'comida') {
      return infoMeat();
    }
    if (recipe.type === 'bebida') {
      return infoDrink();
    }
  };

  return (
    <div className="card">
      <section
        className="section-img"
      >
        <a
          href={ `http://localhost:3000/${type}/${recipe.id}` }
        >
          <img
            alt={ recipe.name }
            className="img"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
          />
        </a>
      </section>

      <section>
        {
          infoComponet()
        }
      </section>
    </div>
  );
};

export default CardFood;
