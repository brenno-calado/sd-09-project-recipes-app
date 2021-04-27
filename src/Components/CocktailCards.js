import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiCocktails } from '../redux/actions';
import '../Styles/FoodCards.css';

function CocktailCards({ cocktails, getCocktails }) {
  async function callCocktail() {
    await getCocktails();
  }

  useEffect(() => {
    callCocktail();
  }, []);

  function createCards() {
    const magicNumber = 11;
    return cocktails.map(
      (cocktail, index) => (index <= magicNumber
      && (
        <div key={ index }>
          <img src={ cocktail.strDrinkThumb } alt="cocktails" className="foodCards" />
          <p>{cocktail.strDrink}</p>
        </div>)
      ),
    );
  }
  return (
    <div className="cardContainer">
      { cocktails ? createCards() : <div />}
    </div>
  );
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
