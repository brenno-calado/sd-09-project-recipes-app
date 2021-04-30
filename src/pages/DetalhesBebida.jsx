import React from 'react';

class DetalhesBebida extends React.Component {
  render() {
    return (
      <div>
        <img data-testid="recipe-photo" src="" alt="imagem da bebida" />
        <h1 data-testid="recipe-title">Titulo</h1>
        <button data-testid="share-btn" type="button">
          <img src="../images/shareIcon.svg" alt="Share" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src="../images/blackHeartIcon.svg" alt="Favorite" />
        </button>
        <h3 data-testid="recipe-category">Categoria</h3>
        <h2>Ingredientes:</h2>
        <ul>
          {/* trocar o ${1} por ${index} */}
          <li data-testid={ `${1}-ingredient-name-and-measure` }>Ingrediente</li>
        </ul>
        <p data-testid="instructions">
          Instruções
        </p>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </div>
    );
  }
}

export default DetalhesBebida;
