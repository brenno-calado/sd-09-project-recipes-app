import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiCocktails } from '../redux/actions';
import '../Styles/FoodCards.css';

class CocktailCards extends React.Component {
  componentDidMount() {
    const callCocktail = async () => {
      const { getCocktails } = this.props;
      await getCocktails();
    };
    callCocktail();
  }

  createCards() {
    const { cocktails } = this.props;
    const magicNumber = 11;
    return cocktails.map(
      (cocktail, index) => (index <= magicNumber
      && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ cocktail.strDrinkThumb }
            alt="cocktails"
            data-testid={ `${index}-card-img` }
            className="foodCards"
          />
          <p data-testid={ `${index}-card-name` }>{cocktail.strDrink}</p>
          <Link to={ `/bebidas/${cocktail.idDrink}/` }>Detalhes</Link>
        </div>)
      ),
    );
  }

  render() {
    const { cocktails } = this.props;
    return (
      <div className="cardContainer">
        {cocktails ? this.createCards() : <div />}
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

const mapStateToProps = (state) => ({ cocktails: state.cocktails.cocktails });

const mapDispatchToProps = (dispatch) => (
  { getCocktails: () => dispatch(requestApiCocktails()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCards);