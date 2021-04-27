import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiMeals } from '../redux/actions';
import '../Styles/FoodCards.css';

function FoodCards({ meals, getMeals }) {
  async function callMeal() {
    await getMeals();
  }

  useEffect(() => {
    callMeal();
  }, []);

  function createCards() {
    const magicNumber = 11;
    return meals.map(
      (meal, index) => (index <= magicNumber
      && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ meal.strMealThumb }
            alt="meal"
            data-testid={ `${index}-card-img` }
            className="foodCards"
          />
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
        </div>)
      ),
    );
  }

  return (
    <div className="cardContainer">
      { meals ? createCards() : <div />}
    </div>
  );
}

FoodCards.propTypes = {
  meals: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  getMeals: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ meals: state.meals.meals });

const mapDispatchToProps = (dispatch) => ({
  getMeals: () => dispatch(requestApiMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodCards);
