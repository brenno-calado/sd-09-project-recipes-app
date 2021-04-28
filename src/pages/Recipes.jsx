import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import './Styles/Recipes.css';

function Recipes({ recipesList: { listType, list } }) {
  const preparedRecipesList = () => list
    .map((recipe, index) => (
      <Card
        key={ index }
        index={ index }
        thumbSource={
          listType === 'drinks' ? recipe.strDrinkThumb : recipe.strMealThumb
        }
        title={ listType === 'drinks' ? recipe.strDrink : recipe.strMeal }
      />
    ))
    .slice(0, 12);

  return (
    <div id="Recipes">
      <Header title="Explorar Comidas" searchBtn />
      <div className="card-list">{preparedRecipesList()}</div>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({ recipesList }) => ({
  recipesList,
});

Recipes.propTypes = {
  listType: PropTypes.string,
  list: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(Recipes);
