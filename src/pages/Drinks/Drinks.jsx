import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import RenderRecipeCards from '../../common/components/RenderRecipeCards';
import { fetchDrinkNameAPI } from '../../services/fetchDrinkAPI';
import { saveDrinks } from '../../actions/userActions';

const Drinks = (props) => {
  const { drinks, history } = props;

  async function fetchData() {
    const { dispatchDrinks } = props;
    await fetchDrinkNameAPI('').then((response) => dispatchDrinks(response));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (drinks) {
    console.log(drinks);
    return (
      <div>
        <Header title="Bebidas" value="bebidas" history={ history } />
        <RenderRecipeCards list={ drinks } kindOfFood="drinks" cardsLimit="12" />
        <Footer />
      </div>
    );
  }

  return (
    <>
      Carregando...
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinks: (drinks) => dispatch(saveDrinks(drinks)),
});

const mapStateToProps = (state) => ({
  drinks: state.searchReducer.drinks,
});

Drinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({}).isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
