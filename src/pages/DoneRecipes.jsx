import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneRecipesFilters from '../components/DoneRecipesFilters';
import DoneRecipesCards from '../components/DoneRecipesCards';
import { sendDoneRecipes } from '../redux/actions';
import '../css/DoneRecipes.css';

function DoneRecipes({ doneRecipesDispatcher }) {
  const getDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    doneRecipesDispatcher(doneRecipes);
  };

  useEffect(() => {
    getDoneRecipes();
  }, []);

  return (
    <div>
      <h1>Receitas Prontas</h1>
      <DoneRecipesFilters />
      <DoneRecipesCards />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  doneRecipesDispatcher: (recipe) => dispatch(sendDoneRecipes(recipe)),
});

DoneRecipes.propTypes = {
  doneRecipesDispatcher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DoneRecipes);
