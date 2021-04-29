import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiMeals } from '../redux/actions';
import '../Styles/FoodCards.css';
import { Link } from 'react-router-dom';

class FoodCards extends React.Component {
  componentDidMount() {
    const callMeal = async () => {
      const { getMeals } = this.props;
      await getMeals();
    };
    callMeal();
  }

  createCards() {
    const { meals } = this.props;
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
          <Link to={`/comidas/${meal.idMeal}/`}>Detalhes</Link>
        </div>)
      ),
    );
  }

  render() {
    const { meals } = this.props;
    return (
      <div className="cardContainer">
        { meals ? this.createCards() : <div />}
      </div>
    );
  }
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
