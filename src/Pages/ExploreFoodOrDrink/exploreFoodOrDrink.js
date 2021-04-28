import { shape } from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import useIdRecipe from '../../services/useIdRecipe';
import './exploreFoodOrDrink.css';

function ExploreFoodScreen({ match: { params: { pageType } } }) {
  const [idRecipe, setPageType] = useIdRecipe();
  useEffect(() => {
    setPageType(pageType);
  });
  let title = '';
  if (pageType === 'comidas') {
    title = 'Comidas';
  }
  if (pageType === 'bebidas') {
    title = 'Bebidas';
  }
  return (
    <div className="food-or-drink-container">
      <Header title={ `Explorar ${title}` } />
      <section>
        <Link to={ `/explorar/${pageType}/ingredientes` }>
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        {(pageType === 'comidas') && (
          <Link to={ `/explorar/${pageType}/area` }>
            <button type="button" data-testid="explore-by-area">
              Por Local de Origem
            </button>
          </Link>
        )}
        <Link to={ `/${pageType}/${idRecipe}` }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </section>
    </div>
  );
}

ExploreFoodScreen.propTypes = {
  match: shape().isRequired,
};

export default ExploreFoodScreen;
