import React, { useContext, useRef } from 'react';
import '../styles/Card.css';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../context';
import useRecipes from '../hooks/useRecipes';
import getAllRecipes from '../services/allRecipesAPI';

function Categories() {
  const CINCO = 5;
  const { values: { categories },
    actions: { setRecipesResult } } = useContext(RecipesContext);
  const { getRecipes } = useRecipes();
  const { pathname } = useLocation();
  const elementRef = useRef(null);

  const filterCategory = async (strCategory) => {
    const category = pathname.includes('comidas') ? 'comidas' : 'bebidas';
    if (strCategory !== elementRef.current) {
      const recipes = await getRecipes(category, strCategory, 'category');
      if (!recipes) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (!Array.isArray(recipes)) {
        alert(recipes.message);
      } else {
        setRecipesResult(recipes);
      }
      elementRef.current = strCategory;
    } else {
      const allRecipes = await getAllRecipes(category);
      setRecipesResult(allRecipes);
    }
  };

  const handleClick = async () => {
    const category = pathname.includes('comidas') ? 'comidas' : 'bebidas';
    const allRecipes = await getAllRecipes(category);
    setRecipesResult(allRecipes);
  };

  return categories ? (
    <>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="All-category-filter"
      >
        All
      </button>
      { categories
        .filter((_, index) => index < CINCO)
        .map(({ strCategory }, index) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ `strCategory${index}` }
            onClick={ () => { filterCategory(strCategory); } }
            type="button"
          >
            { strCategory }
          </button>
        ))}
    </>
  ) : <span>Carregando ...</span>;
}

export default Categories;
