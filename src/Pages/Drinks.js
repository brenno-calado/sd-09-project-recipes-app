import '../styles/mainScreen.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { drinksThunkAction, filterDrinksThunkAction,
  searchThunkAction } from '../action/FoodAndDrinkAction';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import FooterSpec from '../components/FooterSpec';

class Drinks extends React.Component {
  componentDidMount() {
    const { setDrinks, setFilterDrink, getDrinkBoolean,
      getDrinkName, getIngredient, setIngrendient } = this.props;

    if (getIngredient) {
      setIngrendient('ingredient', getIngredient, 'cocktail');
    } else {
      setDrinks('', getDrinkBoolean, getDrinkName);
    }
    setFilterDrink();
  }

  render() {
    const { getDrinks,
      getFilterDrink,
      setDrinks,
      getDrinkBoolean,
      getDrinkName,
      searchBoolean } = this.props;

    if (searchBoolean && getDrinks.length === 1) {
      return <Redirect to={ `/bebidas/${getDrinks[0].idDrink}` } />;
    }

    return (
      <div>
        <Header titleHeader="Bebidas" id="0" type="cocktail" />
        <div className="main">
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
        </div>
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
  getSearchBoolean: state.FoodAndDrinkReducer.searchBar,
  searchBoolean: state.FoodAndDrinkReducer.searchBoolean,
  getIngredient: state.FoodAndDrinkReducer.ingredient,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinks: (drink, drinkBoolean, drinkName) => dispatch(
    drinksThunkAction(drink, drinkBoolean, drinkName),
  ),
  setFilterDrink: () => dispatch(filterDrinksThunkAction()),
  setIngrendient: (search, input, type) => dispatch(
    searchThunkAction(search, input, type),
  ),
});

Drinks.propTypes = ({
  setDrinks: PropTypes.func,
  setFilterDrink: PropTypes.func,
  getDrinks: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
