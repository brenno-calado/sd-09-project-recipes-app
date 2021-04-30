import React from 'react';
import PropTypes from 'prop-types';
import fetchFoodsByID from '../services/fetchFoodsByID';
import concatIngredients from '../services/concatIngredients';

const MAX_FOODS_INGREDIENTS = 15;

const imgStyle = {
  maxWidth: '150x',
  maxHeight: '150px',
  margin: 'auto',
};

const containerStyle = {
  overflowY: 'scroll',
  width: '300px',
  maxHeight: '300px',
  marginTop: '100px',
};

class FoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      ingredients: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetchFoodsByID(id).then((recipe) => {
      this.setState({
        recipe: recipe[0],
        ingredients: concatIngredients(recipe[0], MAX_FOODS_INGREDIENTS),
      });
    });
  }

  render() {
    const { recipe:
      { strMealThumb, strMeal, strCategory, strInstructions, strYoutube },
    } = this.state;
    const { ingredients } = this.state;
    return (
      <div style={ containerStyle }>
        <p>Pagina de detalhes das comidas</p>
        <img
          src={ strMealThumb }
          style={ imgStyle }
          alt=""
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{strMeal}</p>
        <p data-testid="recipe-category">{strCategory}</p>
        {ingredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </p>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        <iframe
          title="Youtube video"
          width="200"
          height="150"
          src={ strYoutube }
          data-testid="video"
        />
        <div data-testid="share-btn">Botão de compartilhar</div>
        <div data-testid="favorite-btn">Botão de favoritar</div>
        <div data-testid="0-recomendation-card">Cartão de recomendação</div>
        <div data-testid="start-recipe-btn">Botão de iniciar receita</div>
      </div>
    );
  }
}

FoodsDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};

export default FoodsDetails;
