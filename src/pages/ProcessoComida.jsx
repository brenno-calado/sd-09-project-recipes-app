import React from 'react';
// import Share from '../components/Share';
// import Favorite from '../components/Favorite';

class ProcessoComida extends React.Component {
  render() {
    return (
      <div>
        {/* <img data-testid="recipe-photo" src={ image } alt="imagem da comida" /> */}
        <h1 data-testid="recipe-title">Titulo</h1>
        {/* <Share />
        <Favorite /> */}
        <h3 data-testid="recipe-category">Categoria</h3>
        <h2>Ingredientes:</h2>
        {/* Os ingredientes nessa pagina deveram ser implementados em um componente separado;
        */}
        <p data-testid="instructions">
          Instruções
        </p>
        <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
      </div>
    );
  }
}

export default ProcessoComida;
