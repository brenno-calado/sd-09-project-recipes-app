import React from 'react';
import '../styles/mainScreen.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterOriginThunkAction, foodThunkAction } from '../action/FoodAndDrinkAction';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import FooterSpec from '../components/FooterSpec';

class ExploreOrigin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'All',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { setFood, setFilterOrigin, getFoodBoolean, getFoodName } = this.props;
    setFood('', getFoodBoolean, getFoodName);
    setFilterOrigin();
  }

  handleChange(event) {
    const { value } = event.target;
    console.log(value);
    const { setFood, getFoodBoolean, getFoodName } = this.props;
    setFood(value, getFoodBoolean, getFoodName);
  }

  render() {
    const {
      getFood,
      getFilterOrigin,
      // setFood,
      // getFoodBoolean,
      // getFoodName,
    } = this.props;

    const { value } = this.state;
    const { handleChange } = this;
    console.log(getFood);
    return (
      <div className="main">
        <Header titleHeader="Explorar Origem" id="0" />
        <aside className="aside">
          <select
            value={ value }
            data-testid="explore-by-area-dropdown"
            onChange={ handleChange }
          >
            <option data-testid="All-option">All</option>
            { getFilterOrigin.map((filter, index) => (
              <option
                key={ `${filter}${index}` }
                data-testid={ `${filter.strArea}-option` }
                value={ filter.strArea }
                // value={ () => setFood(filter.strArea, getFoodBoolean, getFoodName) }
              >
                { filter.strArea }
              </option>
            )) }
          </select>
          {/*
            onClick={ () => setFood(filter.strCategory, getFoodBoolean, getFoodName) }
          */}
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
  // getFilterFood: state.FoodAndDrinkReducer.filterFood,
  getFilterOrigin: state.FoodAndDrinkReducer.filterOrigin,
  getFoodName: state.FoodAndDrinkReducer.foodName,
  getFoodBoolean: state.FoodAndDrinkReducer.foodBoolean,
});

const mapDispatchToProps = (dispatch) => ({
  setFood: (food, foodBoolean, foodName) => dispatch(
    foodThunkAction(food, foodBoolean, foodName),
  ),
  // setFilterFood: () => dispatch(filterFoodThunkAction()),
  setFilterOrigin: () => dispatch(filterOriginThunkAction()),
});

ExploreOrigin.propTypes = ({
  setFood: PropTypes.func,
  setFilterOrigin: PropTypes.func,
  getFood: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreOrigin);
