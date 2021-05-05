import React from 'react';
import '../styles/mainScreen.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterFoodThunkAction, foodThunkAction } from '../action/OriginAction';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import FooterSpec from '../components/FooterSpec';

class ExploreOrigin extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { setFood, setFilterFood, getFoodBoolean, getFoodName } = this.props;
    setFood('', getFoodBoolean, getFoodName);
    setFilterFood();
  }

  handleChange(event) {
    const { value } = event.target;
    console.log(value);
    const { setFood, getFoodBoolean, getFoodName } = this.props;
    setFood(value, getFoodBoolean, getFoodName);
  }

  render() {
    const { getFood, getFilterFood } = this.props;

    const { handleChange } = this;
    console.log(getFood);
    return (
      <div className="main">
        <Header titleHeader="Explorar Origem" id="0" />
        <aside className="aside">
          <select
            value="All"
            data-testid="explore-by-area-dropdown"
            onChange={ handleChange }
          >
            <option data-testid="All-option">All</option>
            { getFilterFood.map((filter, index) => (
              <option
                key={ `${filter}${index}` }
                data-testid={ `${filter.strArea}-option` }
                value={ filter.strArea }
              >
                { filter.strArea }
              </option>
            )) }
          </select>
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

ExploreOrigin.propTypes = ({
  setFood: PropTypes.func,
  setFilterFood: PropTypes.func,
  getFood: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreOrigin);
