import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './Styles/Favorites.css';

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [copiedLink, setCopiedLink] = useState('');
  const [toFilter, setToFilter] = useState('');

  const filter = ({ target: { name } }) => {
    const filtered = favoriteRecipes.filter((recipe) => recipe.type.includes(name));
    setFilteredRecipes(filtered);
    setToFilter(name);
  };

  const copyLink = async (id, type) => {
    const link = `http://localhost:3000/${type}s/${id}`;
    setCopiedLink(id);
    return navigator.clipboard.writeText(link);
  };

  const dislike = (dislikeRecipe) => {
    const newFavorites = favoriteRecipes
      .filter((favorite) => favorite.id !== dislikeRecipe.id)
      .filter((favorite) => favorite.name !== dislikeRecipe.name);
    setFavoriteRecipes(newFavorites);
    const newFiltered = newFavorites
      .filter((recipe) => recipe.type.includes(toFilter));
    setFilteredRecipes(newFiltered);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(getFavoriteRecipes);
    setFilteredRecipes(getFavoriteRecipes);
  }, []);

  return (
    <div className="Favorites">
      <Header title="Receitas Favoritas" />
      <main>
        <section className="filters">
          <button
            className="filter"
            data-testid="filter-by-all-btn"
            type="button"
            name=""
            onClick={ filter }
          >
            All
          </button>
          <button
            className="filter"
            data-testid="filter-by-food-btn"
            type="button"
            name="comida"
            onClick={ filter }
          >
            Food
          </button>
          <button
            className="filter"
            data-testid="filter-by-drink-btn"
            type="button"
            name="bebida"
            onClick={ filter }
          >
            Drinks
          </button>
        </section>

        <section className="cards">
          {filteredRecipes && filteredRecipes.map((recipe, index) => (
            <div key={ index } className="favorite-card">
              <span>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    className="image"
                    src={ recipe.image }
                    alt="Recipe"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              </span>
              <span className="info">
                <div className="top-info">
                  <p
                    className="top-text"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.type === 'comida'
                      ? `${recipe.area} - ${recipe.category}`
                      : recipe.alcoholicOrNot}
                  </p>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <h3 className="name" data-testid={ `${index}-horizontal-name` }>
                      {recipe.name}
                    </h3>
                  </Link>
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={ () => copyLink(recipe.id, recipe.type) }
                  >
                    <img
                      className="share-btn"
                      src={ shareIcon }
                      alt="Share"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => dislike(recipe) }
                  >
                    <img
                      className="favorite-btn"
                      src={ blackHeartIcon }
                      alt="Dislike"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
                {recipe.id === copiedLink && (
                  <p className="copied-link">Link copiado!</p>
                )}
              </span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Favorites;
