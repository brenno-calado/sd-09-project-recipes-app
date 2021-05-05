import React from 'react';
import Header from '../Components/Header';
import ButtonAll from '../Components/ButtonAll';
import ButtonFood from '../Components/ButtonFood';
import ButtonDrink from '../Components/ButtonDrink';

class RecipesDone extends React.Component {
  render() {
    return (
      <div>
        <Header name="Receitas Feitas" />
        <ButtonAll />
        <ButtonFood />
        <ButtonDrink />
      </div>
    );
  }
}

export default RecipesDone;
