import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Header.css';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const renderRecipes = () => favoriteRecipes
    .map((recipe, index) => (
      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
        key={ recipe.id }
        className="card align-items-center m-2 flex-wrap"
      >
        <div
          data-testid={ `${index}-horizontal-image` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.image }
            alt={ recipe.name }
            width="100px"
            height="100px"
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            {(recipe.area !== '' && (`${recipe.area} - ${recipe.category}`))
              || recipe.category}
          </span>
          <span className="card-title" data-testid={ `${index}-card-name` }>
            {recipe.name}
          </span>
        </div>
      </Link>
    ));

  console.log(favoriteRecipes);
  return (
    <>
      <Header page="Receitas Favoritas" hasSearchButton={ false } />
      { renderRecipes() }
    </>
  );
}

export default ReceitasFavoritas;
