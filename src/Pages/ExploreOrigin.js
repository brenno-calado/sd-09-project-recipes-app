import React from 'react';
import '../styles/mainScreen.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  filterAreaThunkAction, filterOriginThunkAction } from '../action/FoodAndDrinkAction';
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
    const { setArea, setFilterOrigin, getFoodBoolean, getFoodName } = this.props;
    setArea('All', getFoodBoolean, getFoodName);
    setFilterOrigin();
  }

  handleChange(event) {
    const { value } = event.target;
    const { setArea } = this.props;
    this.setState({ value });
    setArea(value);
  }

  render() {
    const {
      getFood,
      getFilterOrigin,
    } = this.props;

    const { value } = this.state;
    const { handleChange } = this;

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
  getFilterOrigin: state.FoodAndDrinkReducer.filterOrigin,
  getFoodName: state.FoodAndDrinkReducer.foodName,
  getFoodBoolean: state.FoodAndDrinkReducer.foodBoolean,
});

const mapDispatchToProps = (dispatch) => ({
  setArea: (value) => dispatch(filterAreaThunkAction(value)),

  setFilterOrigin: () => dispatch(filterOriginThunkAction()),
});

ExploreOrigin.propTypes = ({
  setFood: PropTypes.func,
  setFilterOrigin: PropTypes.func,
  getFood: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreOrigin);
