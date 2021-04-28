import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/fetchRecipes';
import './Styles/Recipes.css';
import { getRecipesAction } from '../Redux/actions';

function Foods({ getRecipes, recipes }) {
  const fetchListOfMeals = async () => {
    const data = await fetchMeals();
    getRecipes(data);
  };

  useEffect(() => {
    fetchListOfMeals();
  }, []);

  return (
    <div id="Recipes">
      <Header title="Explorar Comidas" searchBtn />
      <Cards items={ recipes } idType="idMeal" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
