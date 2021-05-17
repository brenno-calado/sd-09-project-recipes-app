import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestApiCocktails } from '../redux/actions';
import ShowCategories from './ShowCategories';
import { fetchCocktailByCategory } from '../services/ApiRequest';
import '../Styles/AllCards.css';

class CocktailCards extends React.Component {
  constructor(props) {
    super(props);
    this.callCocktail = this.callCocktail.bind(this);
    this.updateSearchedDrink = this.updateSearchedDrink.bind(this);
    this.state = {
      filteredByCategories: [],
      toggleCategory: '',
    };
  }

  componentDidMount() {
    const { ingredients } = this.props;
    localStorage.removeItem('id');
    if (ingredients.length === 0) {
      this.callCocktail();
    }
  }

  componentWillUnmount() {
    this.setState({ filteredByCategories: [] });
  }

  async callCocktail() {
    const { getCocktails } = this.props;
    await getCocktails();
  }

  async updateSearchedDrink(category) {
    const { toggleCategory } = this.state;
    this.setState({ toggleCategory: category });
    if (category === toggleCategory) this.setState({ filteredByCategories: null });
    else if (category === 'All') this.setState({ filteredByCategories: null });
    else {
      const categoryResponse = await fetchCocktailByCategory(category);
      this.setState({ filteredByCategories: categoryResponse.drinks });
    }
  }

  createCards() {
    const { cocktails } = this.props;
    const { filteredByCategories } = this.state;
    const maxItens = 11;
    let finalDrinkReturn = [];
    if (filteredByCategories === null) finalDrinkReturn = cocktails;
    else if (filteredByCategories.length > 0) finalDrinkReturn = filteredByCategories;
    else finalDrinkReturn = cocktails;
    return (
      <div className="boxCardsContainer">
        { finalDrinkReturn.map((cocktail, index) => (index <= maxItens
      && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="cardRecipe"
        >
          <Link
            to={ `/bebidas/${cocktail.idDrink}` }
          >
            <img
              src={ cocktail.strDrinkThumb }
              alt="cocktails"
              data-testid={ `${index}-card-img` }
              className="foodCards"
            />
            <p data-testid={ `${index}-card-name` }>{cocktail.strDrink}</p>
          </Link>
        </div>)
        )) }
      </div>
    );
  }

  render() {
    const { cocktails } = this.props;
    if (cocktails === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!cocktails) return <div>Loading...</div>;
    return (
      <div className="cardContainer">
        <ShowCategories name="Bebidas" searchResult={ this.updateSearchedDrink } />
        { this.createCards() }
        { cocktails.length === 1
          ? <Redirect to={ `/bebidas/${cocktails[0].idDrink}` } />
          : ''}
      </div>
    );
  }
}

CocktailCards.propTypes = {
  cocktails: PropTypes.shape({
    map: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
  ingredients: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  getCocktails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cocktails: state.cocktails.cocktails,
  ingredients: state.ingredients,
});

const mapDispatchToProps = (dispatch) => (
  { getCocktails: () => dispatch(requestApiCocktails()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCards);
