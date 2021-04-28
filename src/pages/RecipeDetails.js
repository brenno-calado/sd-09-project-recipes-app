import React from 'react';

const RecipesDetails = () => {
  const index = 0;
  return (
    <div>
      <img
        src={ index }
        alt="profileIcon"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        Title
      </h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorito
      </button>
      <p data-testid="recipe-category">
        texto da categoria
      </p>
      <p
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        Ingredientes
      </p>
      <p
        data-testid="instructions"
      >
        Instruções
      </p>
      <p
        data-testid="video"
      >
        Vídeo
      </p>
      <p
        data-testid={ `${index}-recomendation-card` }
      >
        Vídeo
      </p>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>

  );
};

export default RecipesDetails;
