import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiMeals } from '../redux/actions';
import ShowCategories from './ShowCategories';
import { fetchMealByCategory } from '../services/ApiRequest';
import '../Styles/AllCards.css';

class FoodCards extends React.Component {
  constructor(props) {
    super(props);
    this.callMeal = this.callMeal.bind(this);
    this.updateSearchedMeal = this.updateSearchedMeal.bind(this);
    this.state = {
      filteredByCategories: [],
      toggleCategory: '',
    };
  }

  componentDidMount() {
    const { ingredients } = this.props;
    localStorage.removeItem('id');
    if (ingredients.length === 0) {
      this.callMeal();
    }
  }

  componentWillUnmount() {
    this.setState({ filteredByCategories: [] });
  }

  async callMeal() {
    const { getMeals } = this.props;
    await getMeals();
  }

  async updateSearchedMeal(category) {
    const { toggleCategory } = this.state;
    this.setState({ toggleCategory: category });
    if (category === toggleCategory) this.setState({ filteredByCategories: null });
    else if (category === 'All') this.setState({ filteredByCategories: null });
    else {
      const categoryResponse = await fetchMealByCategory(category);
      this.setState({ filteredByCategories: categoryResponse.meals });
    }
  }

  createCards() {
    const { meals } = this.props;
    const { filteredByCategories } = this.state;
    const maxItens = 11;
    let finalFoodReturn = [];
    if (filteredByCategories === null) finalFoodReturn = meals;
    else if (filteredByCategories.length > 0) finalFoodReturn = filteredByCategories;
    else finalFoodReturn = meals;
    return (
      <div className="boxCardsContainer">
        { finalFoodReturn.map((meal, index) => (index <= maxItens
          && (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="cardRecipe"
            >
              <Link to={ `/comidas/${meal.idMeal}` }>
                <img
                  src={ meal.strMealThumb }
                  alt="meal"
                  data-testid={ `${index}-card-img` }
                  className="foodCards"
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>)
        )) }
      </div>
    );
  }

  render() {
    const { meals } = this.props;
    if (meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!meals) return <div>Loading...</div>;
    return (
      <div className="cardContainer">
        { meals.length === 1
          ? <Redirect to={ `/comidas/${meals[0].idMeal}` } />
          : ''}
        {window.location.pathname === '/explorar/comidas/area'
          ? null
          : <ShowCategories name="Comidas" searchResult={ this.updateSearchedMeal } />}
        { this.createCards() }
      </div>
    );
  }
}

FoodCards.propTypes = {
  meals: PropTypes.shape({
    map: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
  ingredients: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  getMeals: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
  ingredients: state.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  getMeals: () => dispatch(requestApiMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodCards);
