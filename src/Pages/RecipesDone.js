import React from 'react';
import Header from '../Components/Header';

class RecipesDone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
      food: [],
      drink: [],
      bebida: true,
      comida: true,
    };

    this.renderComidas = this.renderComidas.bind(this);
    this.renderBebidas = this.renderBebidas.bind(this);
  }

  componentDidMount() {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterFood = recipesDone.filter((food) => food.type === 'comida');
    const filterDrink = recipesDone.filter((drink) => drink.type === 'bebida');
    this.setState({
      doneRecipes: recipesDone,
      food: filterFood,
      drink: filterDrink,
    });
  }

  renderComidas() {
    const { food, comida } = this.state;
    if (comida) {
      return (
        <div>
          { food.map((value, index) => (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ value.image }
                alt="img-recipe"
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { value.category }
              </p>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {value.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {value.doneDate}
              </p>
              <span
                data-testid={ `${index}-horizontal-tag` }
              >
                {value.tags[0]}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return false;
  }

  renderBebidas() {
    const { drink, bebida } = this.state;
    if (bebida) {
      return (
        <div>
          { drink.map((value, index) => (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ value.image }
                alt="img-recipe"
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { value.category }
              </p>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {value.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {value.doneDate}
              </p>
              <span
                data-testid={ `${index}-horizontal-tag` }
              >
                {value.tags[0]}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return false;
  }

  render() {
    return (
      <div>
        <Header name="Receitas Feitas" />
        <button
          type="button"
          onClick={ () => this.setState({
            comida: true,
            bebida: true,
          }) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => this.setState({
            comida: false,
            bebida: true,
          }) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <button
          type="button"
          onClick={ () => this.setState({
            comida: true,
            bebida: false,
          }) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        { this.renderComidas() }
        { this.renderBebidas() }
      </div>
    );
  }
}

export default RecipesDone;
