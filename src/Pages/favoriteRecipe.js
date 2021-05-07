import React from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import FavoriteButton from '../Components/FavoriteButton'
import ShareIcon from '../images/shareIcon.svg';
import Share from '../Components/Share';
class Favorite extends React.Component {
  constructor() {
    super()
    this.renderAll = this.renderAll.bind(this);
    this.food = this.food.bind(this);
    this.drink = this.drink.bind(this);
    this.update = this.update.bind(this);
    this.shereUrl = this.shereUrl.bind(this);
    this.state = {
      all: true,
      food: false,
      drink: false,
      recipes: [],
      p: '',
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
    const { recipes, p, all } = this.state;
    let alcolicORcategory = '';
    recipes.forEach((value) => {
      if (value.type === 'comida') alcolicORcategory = [...alcolicORcategory, value.area];
      else alcolicORcategory = [...alcolicORcategory, value.alcoholicOrNot];
    });
    let area = '';
    let alcoholic = ''
    if (all) {
      return (
        recipes.map((value, index) => {
          if (value.type === 'comida') {
            area = `${value.area} - ${value.category}`;
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
                {`${alcolicORcategory[index]} - ${value.category}`}
              </p>
              <FavoriteButton
                obj={{
                  id: value.id,
                  type: 'comida',
                  area: area,
                  category: value.category,
                  alcoholicOrNot: alcoholic,
                  name: value.name,
                  image: value.image,
                }}
                test={ `${index}-horizontal-favorite-btn` }
                />
                 <button
                  onClick={ () => this.shereUrl(`${value.type}s/${value.id}`) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ShareIcon}
                >
                  <p>{p}</p>
                  <img src={ShareIcon} />
                </button>
              <p></p>
            </di>
          );
        })
      );
    }
  }

  drink() {
    const { recipes, drink, p } = this.state;
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
                <FavoriteButton
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
                  test={ `${index}-horizontal-favorite-btn` }
                />
                   <button
                  onClick={ () => this.shereUrl(`${value.type}s/${value.id}`) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ShareIcon}
                >
                  <p>{p}</p>
                  <img src={ShareIcon} />
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
    const { food, recipes, p } = this.state;
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
                test={ `${index}-horizontal-favorite-btn` }
                />
                <button
                  onClick={ () => this.shereUrl(`${value.type}s/${value.id}`) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ShareIcon}
                >
                  <p>{p}</p>
                  <img src={ShareIcon} />
                </button>
              <p></p>
            </di>
          );
        })
        );
      }
      return null
    }

    shereUrl(url2) {
      let url = window.location.href;
      if (url.includes('receitas-favoritas')) url = url.replaceAll('receitas-favoritas', '');
      copy(`${url}${url2}`)
        .then(() => this.setState({ p: 'Link copiado!' }));
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
