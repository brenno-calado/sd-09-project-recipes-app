import React, { Component } from 'react';
import Header from '../components/Header';

class ReceitasFeitas extends Component {
  render() {
    const searchIcon = false;
    return (
      <Header title="Receitas Feitas" searchIcon={ searchIcon } />
    );
  }
}

export default ReceitasFeitas;
