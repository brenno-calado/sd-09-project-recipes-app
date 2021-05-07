import React from 'react';
import { Link } from 'react-router-dom';
import './Details+css/Details.css';

class RecipesDone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
      food: [],
      drink: [],
      bebida: false,
      comida: false,
      all: true,
    };
    this.auxiar = this.auxiar.bind(this);
    this.all = this.all.bind(this);
    this.renderComidas = this.renderComidas.bind(this);
    this.renderBebidas = this.renderBebidas.bind(this);
  }

  componentDidMount() {
    this.auxiar();
  }

  auxiar() {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterFood = recipesDone.filter((food) => food.type === 'comida');
    const filterDrink = recipesDone.filter((drink) => drink.type === 'bebida');

    this.setState({
      doneRecipes: recipesDone,
      food: filterFood,
      drink: filterDrink,
    });
  }

  all() {
    const { all, doneRecipes } = this.state;
    let alcolicORcategory = '';
    doneRecipes.forEach((value) => {
      if (value.category === 'comida') alcolicORcategory = [...alcolicORcategory , value.category];
      else alcolicORcategory = [...alcolicORcategory , value.alcoholicOrNot];
    });
    if (all) {
      return (
        <div>
          { doneRecipes.map((value, index) => (
            <div key={ index }>
            <Link to={ `/${value.type}s/${value.id}` }>
              <img
                className="Imagem"
                data-testid={ `${index}-horizontal-image` }
                src={ value.image }
                alt="img-recipe"
              />
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {value.name}
              </p>
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { alcolicORcategory[index] }
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
    return null;
  }

  renderComidas() {
    const { food, comida } = this.state;
    if (comida) {
      return (
        <div>
          { food.map((value, index) => (
            <div key={ index }>
              <Link to={ `/comidas/${value.id}` }>
                <img
                  className="Imagem"
                  data-testid={ `${index}-horizontal-image` }
                  src={ value.image }
                  alt="img-recipe"
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {value.name}
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { value.category }
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
              <Link to={ `/bebidas/${value.id}` }>
                <img
                  className="Imagem"
                  data-testid={ `${index}-horizontal-image` }
                  src={ value.image }
                  alt="img-recipe"
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {value.name}
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { value.alcoholicOrNot }
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
        {/* <Header name="Receitas Feitas" /> */}
        <button
          type="button"
          onClick={ () => this.setState({
            comida: false,
            all: true,
            bebida: false,
          }) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => this.setState({
            comida: false,
            all: false,
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
            all: false,
            bebida: false,
          }) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        { this.renderComidas() }
        { this.renderBebidas() }
        { this.all() }
      </div>
    );
  }
}

export default RecipesDone;
