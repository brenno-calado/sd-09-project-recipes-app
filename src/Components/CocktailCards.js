import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Styles/FoodCards.css';

class CocktailCards extends Component {
  constructor(props) {
    super(props);
    this.createCards = this.createCards.bind(this);
  }

  createCards() {
    const { cocktails } = this.props;
    const magicNumber = 11;
    return cocktails.map(
      (cocktail, index) => (index <= magicNumber
      && (
        <div key={ index }>
          <img src={ cocktail.strDrinkThumb } alt="cocktails" className="foodCards" />
          <p>{cocktail.strDrink}</p>
        </div>)
      ),
    );
  }

  render() {
    return (
      <div className="cardContainer">
        { this.createCards() }
      </div>
    );
  }
}

CocktailCards.propTypes = {
  cocktails: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ cocktails: state.cocktails.cocktails });

export default connect(mapStateToProps)(CocktailCards);
