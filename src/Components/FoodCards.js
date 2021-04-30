import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiMeals } from '../redux/actions';
import ShowCategories from './ShowCategories';
import { fetchMealByCategory } from '../services/ApiRequest';
import '../Styles/FoodCards.css';

class FoodCards extends React.Component {
  constructor(props) {
    super(props);
    this.callMeal = this.callMeal.bind(this);
    this.updateSearchedMeal = this.updateSearchedMeal.bind(this);
    this.state = {
      filteredByCategories: [],
    };
  }

  componentDidMount() {
    this.callMeal();
  }

  componentWillUnmount() {
    this.setState({ filteredByCategories: [] });
  }

  async callMeal() {
    const { getMeals } = this.props;
    await getMeals();
  }

  async updateSearchedMeal(category) {
    const categoryResponse = await fetchMealByCategory(category);
    this.setState({
      filteredByCategories: categoryResponse.meals,
    });
  }

  createCards() {
    const { meals } = this.props;
    const { filteredByCategories } = this.state;
    const maxItens = 11;
    let finalFoodReturn = [];
    if (filteredByCategories === null) finalFoodReturn = meals;
    else if (filteredByCategories.length > 0) finalFoodReturn = filteredByCategories;
    else finalFoodReturn = meals;
    return finalFoodReturn.map(
      (meal, index) => (index <= maxItens
      && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
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
      ),
    );
  }

  render() {
    const { meals } = this.props;
    console.log(this.state.filteredByCategories)
    if (meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!meals) return <div>Loading...</div>;
    return (
      <div className="cardContainer">
        <ShowCategories name="Comidas" searchResult={ this.updateSearchedMeal } />
        { this.createCards() }
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

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getMeals: () => dispatch(requestApiMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodCards);
