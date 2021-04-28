import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchBeverages } from '../services/fetchRecipes';
import './Styles/Recipes.css';
import { getRecipesAction } from '../Redux/actions';

function Beverages({ getRecipes, recipes }) {
  const fetchListOfDrinks = async () => {
    const data = await fetchBeverages();
    getRecipes(data);
  };

  useEffect(() => {
    fetchListOfDrinks();
  }, []);

  return (
    <div id="Recipes">
      <Header title="Explorar Bebidas" searchBtn />
      <Cards items={ recipes } idType="idDrink" />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesList.list,
});

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (data) => dispatch(getRecipesAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Beverages);
