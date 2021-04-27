import React from 'react';
import { object } from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function FoodMainPage({ match }) {
  return (
    <div>
      <Header page="Comidas" search />
      <RecipesList path={ match.path } />
      <Footer />
    </div>
  );
}

FoodMainPage.propTypes = {
  match: object,
}.isRequired;

export default FoodMainPage;
