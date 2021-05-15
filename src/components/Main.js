import React from 'react';
import { shape, string } from 'prop-types';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { verifyItemInFavorite } from '../services/functionsApi';
import '../css/Main.css';

function Main({ recipes }) {
  const { pathname } = useLocation();
  const maxArrayLength = 12;

  const page = pathname.includes('comidas') ? 'Meal' : 'Drink';

  if (recipes === null) {
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (!recipes) return <div>Loading...</div>;
  if (recipes.length === 1) {
    return <Redirect to={ `${pathname}/${recipes[0][`id${page}`]}` } />;
  }

  return (
    <main className="main-wrapper">
      { recipes.map((recipe, index) => (
        index < maxArrayLength ? (
          <Link
            to={ `${pathname.includes('explorar')
              ? '/comidas'
              : pathname}/${recipe[`id${page}`]}` }
            key={ recipe[`id${page}`] }
          >
            <button type="button" data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe[`str${page}Thumb`] }
                alt={ recipe[`str${page}`] }
                className="img-recipe"
              />
              <div className="info-recipe-container">
                <p
                  data-testid={ `${index}-card-name` }
                  className="title-recipe"
                >
                  { recipe[`str${page}`] }
                </p>
                <p className="instructions-recipe">
                  {recipe.strInstructions}
                </p>
              </div>
              { verifyItemInFavorite(recipe[`id${page}`])
                ? <FaHeart className="icon-heart" />
                : <FaRegHeart className="icon-heart" /> }
            </button>
          </Link>
        ) : false
      )) }
    </main>
  );
}

Main.propTypes = { recipes: shape(
  { strMeal: string, strMealThumb: string },
) }.isRequired;

export default Main;
