import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import RenderRecipeCards from '../../common/components/RenderRecipeCards';
import {
  fetchDrinksFilteredByCategory,
  fetchDrinkCategory,
  fetchDrinkNameAPI,
} from '../../services/fetchDrinkAPI';
import { saveDrinks } from '../../actions/userActions';
import GenericCategoryButton from '../../common/components/buttons/GenericCategoryButton';

const Drinks = (props) => {
  const { drinks, history } = props;
  const [drinksCategoryList, setDrinksCategoryList] = useState();
  const [filteredByCategoryArray, setFilteredBYCategoryArray] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const cinco = 5;

  async function fetchData() {
    const { dispatchDrinks } = props;
    await fetchDrinkNameAPI('').then((response) => dispatchDrinks(response));
    await fetchDrinkCategory().then((r) => setDrinksCategoryList(r));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterByCategory(category) {
    fetchDrinksFilteredByCategory(category).then(setFilteredBYCategoryArray);
  }

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (drinks.length === 1) {
    console.log(drinks);
    history.push(`/bebidas/${drinks[0].idDrink}`, drinks[0]);
    return null;
  }

  return (
    <div>
      <Header title="Bebidas" value="bebidas" history={ history } />
      {
        drinksCategoryList && drinksCategoryList.drinks
          .slice(0, cinco)
          .map((drink, index) => (
            <GenericCategoryButton
              key={ index }
              buttonLabel={ drink.strCategory }
              action={ filterByCategory }
            />
          ))
      }
      {
        filteredByCategoryArray
          ? (
            <RenderRecipeCards
              array={ filteredByCategoryArray }
              kindOfFood="drinks"
              cardsLimit="12"
            />
          )
          : <RenderRecipeCards list={ drinks } kindOfFood="drinks" cardsLimit="12" />
      }
      <Footer />
    </div>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
