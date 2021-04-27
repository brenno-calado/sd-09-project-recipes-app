import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { filterFoodThunkAction, foodThunkAction } from '../action/FoodAndDrinkAction';
import FoodCard from '../components/FoodCard';

class Food extends React.Component {
  componentDidMount() {
    const { setFood, setFilterFood, getFoodBoolean, getFoodName } = this.props;
    setFood('', getFoodBoolean, getFoodName);
    setFilterFood();
  }

  render() {
    const {
      getFood,
      getFilterFood,
      setFood,
      getFoodBoolean,
      getFoodName } = this.props;

    return (
      <div>
        <h1>Food</h1>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setFood('All', getFoodBoolean, getFoodName) }
        >
          All
        </button>
        { getFilterFood.map((filter, index) => (
          <button
            type="button"
            key={ `${filter}${index}` }
            data-testid={ `${filter.strCategory}-category-filter` }
            onClick={ () => setFood(filter.strCategory, getFoodBoolean, getFoodName) }
          >
            {filter.strCategory}
          </button>
        )) }
        <Link to="bebidas">Drinks</Link>
        { getFood.map((food, index) => (
          <FoodCard key={ `${food}${index}` } food={ food } index={ index } />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getFood: state.FoodAndDrinkReducer.food,
  getFilterFood: state.FoodAndDrinkReducer.filterFood,
  getFoodName: state.FoodAndDrinkReducer.foodName,
  getFoodBoolean: state.FoodAndDrinkReducer.foodBoolean,
});

const mapDispatchToProps = (dispatch) => ({
  setFood: (food, foodBoolean, foodName) => dispatch(
    foodThunkAction(food, foodBoolean, foodName),
  ),
  setFilterFood: () => dispatch(filterFoodThunkAction()),
});

Food.propTypes = ({
  setFood: PropTypes.func,
  setFilterFood: PropTypes.func,
  getFood: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Food);
