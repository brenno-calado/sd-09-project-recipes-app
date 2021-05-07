import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import Footer from '../components/Footer';
import Ingredient from '../components/Ingredients';
import { ingredientsFetch } from '../actions/Ingredients';
import Header from '../components/Header';
import '../Style/Ingredients.css';
import MealLoading from '../images/lf30_editor_oblwx6ru.json';
import DrinkLoading from '../images/lf30_editor_brwuobfm.json';

function ExploreIngredients({ match, getIngredients, data, loading }) {
  const type = match.params.page === 'comidas' ? 'meals' : 'drinks';

  useEffect(() => {
    getIngredients(match.params.page);
  }, [getIngredients, match]);

  //
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Math.path.includes('comidas') ? MealLoading : DrinkLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (loading) {
    return (
      <div className="animates">
        <Lottie
          options={ defaultOptions }
          height={ 400 }
          width={ 400 }
        />
      </div>
    );
  }

  if (!data[type]) return <h3>Loading...</h3>;

  return (
    <div>
      <Header page="Ingredientes" />
      <div className="ingredientsPage">
        { data[type].map((ingredient, index) => {
          const nameIngredient = type === 'meals' ? 'strIngredient' : 'strIngredient1';
          return (
            <Ingredient
              name={ ingredient[nameIngredient] }
              index={ index }
              key={ index }
              type={ type }
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.setIngredients.data,
  loading: state.setIngredients.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getIngredients: (page) => dispatch(ingredientsFetch(page)),
});

ExploreIngredients.propTypes = {
  match: PropTypes.objectOf.isRequired,
  getIngredients: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired,
};
// Colocar o resultado da API no state usando useState;
// Fazer um MAP para encontrar os ingredientes
export default connect(mapStateToProps, mapDispatchToProps)(ExploreIngredients);
