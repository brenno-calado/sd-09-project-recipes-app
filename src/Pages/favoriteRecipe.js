import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import FavoriteButton from '../Components/FavoriteButton'
class Favorite extends React.Component {
  constructor() {
    super()
    this.renderAll = this.renderAll.bind(this);
    this.food = this.food.bind(this);
    this.drink = this.drink.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      all: true,
      food: false,
      drink: false,
      recipes: [],
    }
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ recipes: favoriteRecipes });
    this.renderAll();
  }

  renderAll() {
    const { recipes } = this.state;
    let alcolicORcategory = '';
    recipes.forEach((value) => {
      if (value.type === 'comida') alcolicORcategory = [...alcolicORcategory, value.area];
      else alcolicORcategory = [...alcolicORcategory, value.alcoholicOrNot];
    });
    let area = '';
    let alcoholic = ''
    const { all } = this.state;
    if (all) {
      return (
        recipes.map((value, index) => {
          if (value.type === 'comida') {
            area = value.area;
            alcoholic = '';
          }
          else{
            area = '';
            alcoholic = value.alcoholicOrNot;
          }
          return (
            <di onClick={ this.update }>
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
                { value.category }
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {alcolicORcategory[index]}
              </p>
              {/* <div onClick={this.update}> */}
              <FavoriteButton
                update={this.update}
                obj={{
                  id: value.id,
                  type: 'comida',
                  area: area,
                  category: value.category,
                  alcoholicOrNot: alcoholic,
                  name: value.name,
                  image: value.image,
                }}
                />
              {/* </div> */}
              <p></p>
            </di>
          );
        })
      );
    }
  }

  drink() {
    const { recipes } = this.state;
    const { drink } = this.state;
    if (drink) {
      return (
        recipes.filter((type) => type.type === 'bebida')
        .map((value, index) => {
          return (
            <di>
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
                { value.alcoholicOrNot }
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {value.category}
              </p>
              <button onClick={this.update}>
                <FavoriteButton
                  onClick={ this.update }
                  id={value.id}
                  obj={{
                    id: value.id,
                    type: value.type,
                    area: '',
                    category: value.category,
                    alcoholicOrNot: value.alcoholicOrNot,
                    name: value.name,
                    image: value.image,
                  }}
                />

              </button>
              <p></p>
            </di>
          );
        })
      );
    }
    return null;
  }

  food() {
    const { food, recipes } = this.state;
    if (food) {
      return (
        recipes.filter((type) => type.type === 'comida')
        .map((value, index) => {
          return (
            <di>
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
                { value.category }
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {value.area}
              </p>
              <button onClick={this.update}>
              <FavoriteButton
                obj={{
                  id: value.id,
                  type: value.type,
                  area: value.area,
                  category: value.category,
                  alcoholicOrNot: '',
                  name: value.name,
                  image: value.image,
                }}
                />
              </button>
              <p></p>
            </di>
          );
        })
        );
      }
      return null
    }

    render() {
      return (
        <div>
        {/* <Header name="Receitas Favoritas" /> */}
        <button
          type="button"
          onClick={ () => this.setState({
            food: false,
            all: true,
            drink: false,
          }) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => this.setState({
            food: false,
            all: false,
            drink: true,
          }) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <button
          type="button"
          onClick={ () => this.setState({
            food: true,
            all: false,
            drink: false,
          }) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        {this.renderAll()}
        {this.food()}
        {this.drink()}
      </div>
    );
  }
}


export default (Favorite);
