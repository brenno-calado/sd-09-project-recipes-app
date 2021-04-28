import React, { Component } from 'react';
import Header from '../components/Header';

class ReceitasFavoritas extends Component {
  render() {
    const searchIcon = false;
    return (
      <Header title="Receitas Favoritas" searchIcon={ searchIcon } />
    );
  }
}

export default ReceitasFavoritas;
