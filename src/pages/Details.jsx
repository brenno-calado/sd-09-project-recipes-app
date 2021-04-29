import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsByIdThunk, cocktailsByIdThunk } from '../redux/actions';

function Details({
  match: { params: { id } },
  mealsById,
  cocktailsById,
  recipeType,
  recipe,
}) {
  useEffect(() => {
    if (recipeType === 'meals') {
      mealsById(id);
    }
    if (recipeType === 'cocktails') {
      cocktailsById(id);
    }
  }, []);

  console.log(recipe);

  return (
    <section>
      <h1>Detalhes da Receita</h1>
      <img
        src={ recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="current recipe"
        data-testid="recipe-photo"
      />
      <div>
        <button
          type="button"
          onClick={ () => {} }
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          onClick={ () => {} }
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
      <div>
        <p data-testid="recipe-title">
          { recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
        </p>
        <p data-testid="recipe-category">Texto da categoria</p>
      </div>
      <div>
        ingredients
      </div>
      <div>
        <p data-testid="instructions">texto de instruções</p>
        <div>Video</div>
      </div>
      <div>
        receitas recomendadas
      </div>
      <button
        type="button"
        onClick={ () => {} }
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.loginReducer.recipe,
  recipeType: state.loginReducer.recipeType,
});

const mapDispatchToProps = (dispatch) => ({
  mealsById: (id) => dispatch(mealsByIdThunk(id)),
  cocktailsById: (id) => dispatch(cocktailsByIdThunk(id)),
});

Details.propTypes = {
  match: PropTypes.objectOf().isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  mealsById: PropTypes.func.isRequired,
  cocktailsById: PropTypes.func.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
