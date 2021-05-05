import '../styles/mainScreen.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drinksThunkAction, filterDrinksThunkAction } from '../action/FoodAndDrinkAction';
import DrinkCard from '../components/DrinkCard';
import FooterSpec from '../components/FooterSpec';

class Drinks extends React.Component {
  componentDidMount() {
    const { setDrinks, setFilterDrink, getDrinkBoolean, getDrinkName } = this.props;
    setDrinks('', getDrinkBoolean, getDrinkName);
    setFilterDrink();
  }

  render() {
    const { getDrinks,
      getFilterDrink,
      setDrinks,
      getDrinkBoolean,
      getDrinkName } = this.props;
    return (
      <div className="main">
        <h1>Drinks</h1>
        <aside className="aside">
          <button
            className="button"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setDrinks('All', getDrinkBoolean, getDrinkName) }
          >
            All
          </button>
          { getFilterDrink.map((filter, index) => (
            <button
              className="button"
              type="button"
              key={ `${filter}${index}` }
              data-testid={ `${filter.strCategory}-category-filter` }
              onClick={ () => setDrinks(filter.strCategory,
                getDrinkBoolean, getDrinkName) }
            >
              {filter.strCategory}
            </button>
          )) }
        </aside>
        <section className="mainBox">
          { getDrinks.map((drink, index) => (
            <DrinkCard
              key={ `${drink}${index}` }
              drink={ drink }
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
  getDrinks: state.FoodAndDrinkReducer.drinks,
  getFilterDrink: state.FoodAndDrinkReducer.filterDrinks,
  getDrinkName: state.FoodAndDrinkReducer.drinkName,
  getDrinkBoolean: state.FoodAndDrinkReducer.drinkBoolean,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinks: (drink, drinkBoolean, drinkName) => dispatch(
    drinksThunkAction(drink, drinkBoolean, drinkName),
  ),
  setFilterDrink: () => dispatch(filterDrinksThunkAction()),
});

Drinks.propTypes = ({
  setDrinks: PropTypes.func,
  setFilterDrink: PropTypes.func,
  getDrinks: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
