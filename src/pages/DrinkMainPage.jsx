import React from 'react';
import { object } from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function DrinkMainPage({ match }) {
  return (
    <div>
      <Header page="Bebidas" search />
      <RecipesList path={ match.path } />
      <Footer />
    </div>
  );
}

DrinkMainPage.propTypes = {
  match: object,
}.isRequired;

export default DrinkMainPage;
