import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Styles/FoodCards.css';

class FoodCards extends Component {
  constructor(props) {
    super(props);
    this.createCards = this.createCards.bind(this);
  }

  createCards() {
    const { meals } = this.props;
    const magicNumber = 11;
    return meals.map(
      (meal, index) => (index <= magicNumber
      && (
        <div key={ index }>
          <img src={ meal.strMealThumb } alt="meal" className="foodCards" />
          <p>{meal.strMeal}</p>
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

FoodCards.propTypes = {
  meals: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ meals: state.meals.meals });

export default connect(mapStateToProps)(FoodCards);
