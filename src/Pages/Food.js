import '../styles/mainScreen.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterFoodThunkAction, foodThunkAction } from '../action/FoodAndDrinkAction';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import FooterSpec from '../components/FooterSpec';

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
      <div className="main">
        <Header titleHeader="Comidas" id="0" />
        <aside className="aside">
          <button
            className="button"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setFood('All', getFoodBoolean, getFoodName) }
          >
            All
          </button>
          { getFilterFood.map((filter, index) => (
            <button
              className="button"
              type="button"
              key={ `${filter}${index}` }
              data-testid={ `${filter.strCategory}-category-filter` }
              onClick={ () => setFood(filter.strCategory, getFoodBoolean, getFoodName) }
            >
              {filter.strCategory}
            </button>
          )) }
        </aside>
        <section className="mainBox">
          { getFood.map((food, index) => (
            <FoodCard
              key={ `${food}${index}` }
              food={ food }
              index={ index }
              testid="-recipe-card"
              nameId="-card-name"
            />
          ))}
        </section>
        <FooterSpec />
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
