import React from 'react';
import Header from '../components/Header';

class FavoriteRecipes extends React.Component {
  render() {
    return (
      <div>
        <Header title="Receitas Favoritas" />
        <p>Esta é a pagina de receitas favoritas.</p>
      </div>
    );
  }
}

export default FavoriteRecipes;
