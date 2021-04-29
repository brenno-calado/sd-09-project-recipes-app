import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    return (
      <footer>
        <img src={ drinkIcon } alt="Ícone de um drink" />
        <img src={ exploreIcon } alt="Ícone de uma bússola" />
        <img src={ mealIcon } alt="Ícone de talheres" />
      </footer>

    );
  }
}

export default Footer;
