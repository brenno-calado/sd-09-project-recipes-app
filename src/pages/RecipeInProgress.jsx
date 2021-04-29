import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const [favorite, setFavorite] = useState(false);

  const [title, setTitle] = useState('Title');
  const [ingredients, setIngredient] = useState(['Item-1', 'Item-2', 'Item-3']);
  const [category, setCategory] = useState('Categoria');
  const [instructions, setInstructions] = useState('');

  function handleClick() {
    setFavorite(!favorite);
  }

  function rendeImage() {
    return (<img data-testid="recipe-photo" src="#" alt="Imagem da receita" />);
  }

  function rendeTitle() {
    return (<h2 data-testid="recipe-title">{title}</h2>);
  }

  function rendeCategory() {
    return (<p data-testid="recipe-category">{category}</p>);
  }

  function btnShare() {
    return (
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
    );
  }

  function btnFavorite() {
    return (
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleClick }
      >
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="Favoritar" />
      </button>
    );
  }

  function handleCheck({ target }) {
    console.log(target.checked);
  }

  function henderIngredients() {
    return (
      <>
        <h3>Ingredients</h3>
        { ingredients.map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ { display: 'block' } }
          >
            <input
              id={ ingredient }
              type="checkbox"
              onChange={ handleCheck }
              value={ ingredient }
            />
            { ingredient }
          </label>
        )) }
      </>
    );
  }

  function henderInstructions() {
    return (
      <>
        <h3>Instructions</h3>
        <p data-testid="instructions">{instructions}</p>
      </>
    );
  }

  function handleFinished() {
    console.log('#');
  }

  function btnFinished() {
    return (
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleFinished }
      >
        Finished
      </button>
    );
  }

  return (
    <div>
      { rendeImage() }
      { rendeTitle() }
      { rendeCategory() }
      { btnShare() }
      { btnFavorite() }
      { henderIngredients() }
      { henderInstructions() }
      { btnFinished() }
    </div>
  );
}

// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn".

export default RecipeInProgress;
