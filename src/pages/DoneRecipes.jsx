import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../Style/DoneRecipes.css';
import share from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [copy, setCopy] = useState(false);
  const [recipes, setRecipes] = useState(doneRecipes);
  const [filter, setFilter] = useState('all');

  const handleShare = (type, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopy(true);
    const timeoutToCopy = 3000;
    setTimeout(() => {
      setCopy(false);
    }, timeoutToCopy);
  };

  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    const handleFilter = () => {
      if (filter === 'all') {
        setRecipes(doneRecipe);
      } else {
        setRecipes(doneRecipe.filter((recipe) => recipe.type === filter));
      }
    };
    handleFilter();
  }, [filter]);

  const renderRecipes = () => (
    recipes.map((recipe, index) => (
      <Link to={ `/${recipe.type}s/${recipe.id}` } key={ recipe.name }>
        <div className="doneCard">
          <img
            src={ recipe.image }
            alt="Recipe"
            data-testid={ `${index}-horizontal-image` }
            className="doneImage"
          />
          <div className="contentDoneCard">
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.alcoholicOrNot || `${recipe.category}`}` }
            </h4>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Feito em: ${recipe.doneDate} ` }
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShare(recipe.type, recipe.id) }
            >
              <img src={ share } alt="Compartilhar" />
            </button>
            { copy && 'Link copiado!' }
            <div className="tags">
              { recipe.tags && recipe.tags.map((tag) => (
                <p
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                >
                  { tag }
                </p>
              )) }
            </div>
          </div>
        </div>
      </Link>
    ))
  );

  return (
    <div>
      <Header page="Receitas Feitas" />
      <div className="doneButtons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Bebidas
        </button>
      </div>
      <div className="doneList">
        { renderRecipes() }
      </div>
    </div>
  );
}

export default DoneRecipes;
