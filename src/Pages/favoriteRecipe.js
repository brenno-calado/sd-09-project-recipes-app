import React from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import FavoriteButton from '../Components/FavoriteButton';
import ShareIcon from '../images/shareIcon.svg';

class Favorite extends React.Component {
  constructor() {
    super();
    this.renderAll = this.renderAll.bind(this);
    this.update = this.update.bind(this);
    this.shereUrl = this.shereUrl.bind(this);
    this.state = {
      recipes: [],
      p: '',
      filter: '',
    };
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ recipes: favoriteRecipes });
    this.renderAll();
  }

  shereUrl(url2) {
    let url = window.location.href;
    if (url.includes('receitas-favoritas')) {
      url = url.replaceAll('receitas-favoritas', '');
    }
    copy(`${url}${url2}`)
      .then(() => this.setState({ p: 'Link copiado!' }));
  }

  renderAll() {
    const { recipes, p, filter } = this.state;
    let alcolicORcategory = '';
    recipes.forEach((value) => {
      if (value.type === 'comida') alcolicORcategory = [...alcolicORcategory, value.area];
      else alcolicORcategory = [...alcolicORcategory, value.alcoholicOrNot];
    });
    let ar = '';
    let newRecipes;
    let alcoholic = '';
    if (filter === 'comida' || filter === 'bebida') {
      newRecipes = recipes.filter((value) => value.type === filter);
    } else newRecipes = recipes;
    return (
      newRecipes.map((value, index) => {
        if (value.type === 'comida') {
          ar = `${value.area} - ${value.category}`;
          alcoholic = '';
        } else {
          ar = '';
          alcoholic = value.alcoholicOrNot;
        }
        return (
          <di
            key={ index }
            onClick={ this.update }
          >
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
              obj={ {
                id: value.id,
                type: 'comida',
                area: ar,
                category: value.category,
                alcoholicOrNot: alcoholic,
                name: value.name,
                image: value.image,
              } }
              test={ `${index}-horizontal-favorite-btn` }
            />
            <button
              type="button"
              onClick={ () => this.shereUrl(`${value.type}s/${value.id}`) }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareIcon }
            >
              <p>{p}</p>
              <img src={ ShareIcon } alt="button share" />
            </button>
          </di>
        );
      })
    );
  }

  render() {
    return (
      <div>
        {/* <Header name="Receitas Favoritas" /> */}
        <button
          type="button"
          onClick={ () => this.setState({ filter: '' }) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => this.setState({ filter: 'bebida' }) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <button
          type="button"
          onClick={ () => this.setState({ filter: 'comida' }) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        {this.renderAll()}
      </div>
    );
  }
}

export default (Favorite);
