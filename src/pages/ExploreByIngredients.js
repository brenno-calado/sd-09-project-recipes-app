import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import { fetchIngredientsAction } from '../actions';
import IngredientsCard from '../components/IngredientsCard';

class ExploreByIngredients extends Component {
  componentDidMount() {
    const { fetchIngredients } = this.props;
    fetchIngredients();
  }

  render() {
    const searchIcon = false;
    const { ingredients } = this.props;
    const mxmIngredients = 12;
    if (!ingredients) return <p>Loading...</p>;
    const filteredIngredients = ingredients.filter((_, index) => index < mxmIngredients);
    return (
      <>
        <Header title="Explorar Ingredientes" searchIcon={ searchIcon } />
        <div className="ingredients-wrap">
          { filteredIngredients.map((ingredient, index) => (
            <IngredientsCard
              key={ index }
              ingredient={ ingredient }
              index={ index }
            />
          )) }
        </div>
        <FooterMenu />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchIngredients: () => dispatch(fetchIngredientsAction()),
});

const mapStateToProps = (state) => ({
  ingredients: state.exploreReducer.ingredientsList,
  img: state.exploreReducer.image,
});

ExploreByIngredients.propTypes = {
  fetchIngredients: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByIngredients);
