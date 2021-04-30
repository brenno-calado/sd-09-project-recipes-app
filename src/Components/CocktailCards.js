import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestApiCocktails } from '../redux/actions';
import ShowCategories from './ShowCategories';
import { fetchCocktailByCategory } from '../services/ApiRequest';
import '../Styles/FoodCards.css';

class CocktailCards extends React.Component {
  constructor(props) {
    super(props);
    this.callCocktail = this.callCocktail.bind(this);
    this.updateSearchedDrink = this.updateSearchedDrink.bind(this);
    this.state = {
      filteredByCategories: [],
    };
  }

  componentDidMount() {
    this.callCocktail();
  }

  componentWillUnmount() {
    this.setState({ filteredByCategories: [] });
  }

  async callCocktail() {
    const { getCocktails } = this.props;
    await getCocktails();
  }

  async updateSearchedDrink(category) {
    const categoryResponse = await fetchCocktailByCategory(category);
    this.setState({
      filteredByCategories: categoryResponse.drinks,
    });
  }

  createCards() {
    const { cocktails } = this.props;
    const { filteredByCategories } = this.state;
    const maxItens = 11;
    let finalDrinkReturn = [];
    if (filteredByCategories === null) finalDrinkReturn = cocktails;
    else if (filteredByCategories.length > 0) finalDrinkReturn = filteredByCategories;
    else finalDrinkReturn = cocktails;
    return finalDrinkReturn.map(
      (cocktail, index) => (index <= maxItens
      && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
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
      ),
    );
  }

  render() {
    const { cocktails } = this.props;
    console.log(this.state.filteredByCategories);
    if (cocktails === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!cocktails) return <div>Loading...</div>;
    return (
      <div className="cardContainer">
        <ShowCategories name="Bebidas" searchResult={ this.updateSearchedDrink } />
        { this.createCards() }
      </div>
    );
  }
}

CocktailCards.propTypes = {
  cocktails: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  getCocktails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cocktails: state.cocktails.cocktails,
});

const mapDispatchToProps = (dispatch) => (
  { getCocktails: () => dispatch(requestApiCocktails()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCards);
