import React from 'react';

function Details() {
  return (
    <section>
      <img data-testid="recipe-photo" src="" alt="recipe" />
      <h2 data-testid="recipe-title">Titulo da Receita</h2>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <p data-testid="{index}-ingredient-name-and-measure">Ingredientes</p>
      <p data-testid="instructions">Instruções</p>
      <span data-testid="video">Video</span>
      <span data-testid="{index}-recomendation-card">Card de Recomendaçoes</span>
      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </section>
  );
}

export default Details;
