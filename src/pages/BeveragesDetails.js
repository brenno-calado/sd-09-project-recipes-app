import React from 'react';
import PropTypes from 'prop-types';
import fetchDrinksByID from '../services/fetchDrinksByID';
import concatIngredients from '../services/concatIngredients';

const MAX_BEVERAGE_INGREDIENTS = 15;

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

class DrinksDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      ingredients: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetchDrinksByID(id).then((recipe) => {
      console.log(recipe[0]);
      this.setState({
        recipe: recipe[0],
        ingredients: concatIngredients(recipe[0], MAX_BEVERAGE_INGREDIENTS),
      });
    });
  }

  render() {
    const { recipe:
      { strDrinkThumb, strDrink, strAlcoholic, strInstructions },
    } = this.state;
    const { ingredients } = this.state;
    return (
      <div style={ containerStyle }>
        <p>Pagina de detalhes das Bebidas</p>
        <img
          src={ strDrinkThumb }
          style={ imgStyle }
          alt=""
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{strDrink}</p>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        {ingredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {console.log(index)}
            {ingredient}
          </p>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        <div data-testid="share-btn">Botão de compartilhar</div>
        <div data-testid="favorite-btn">Botão de favoritar</div>
        <div data-testid="0-recomendation-card">Cartão de recomendação</div>
        <div data-testid="start-recipe-btn">Botão de iniciar receita</div>
      </div>
    );
  }
}

DrinksDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};

export default DrinksDetails;
