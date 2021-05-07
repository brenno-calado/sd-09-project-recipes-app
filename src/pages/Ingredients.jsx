import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearch, dontFetch } from '../Redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchIngredients from '../services/fetchIngredients';

function Ingredients({ fetchRecipes, doNotFetch }) {
  const [ingredients, setIngredients] = useState([]);
  const location = useLocation();
  const query = location.pathname.includes('comidas') ? 'meal' : 'cocktail';
  const type = location.pathname.includes('comidas') ? 'comidas' : 'bebidas';

  useEffect(() => {
    const getIngredients = async () => {
      const maxItemsToShow = 12;
      const allIngredients = await fetchIngredients(query);
      setIngredients(allIngredients.slice(0, maxItemsToShow));
    };
    getIngredients();
  }, [query]);

  const handleClick = (ingredient) => {
    doNotFetch();
    const url = `https://www.the${query}db.com/api/json/v1/1/filter.php?i=${ingredient}`;
    fetchRecipes(url);
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <section className="Cards">
        {ingredients.map((ingredient, index) => (
          <Link to={ `/${type}` } key={ index }>
            <button
              type="button"
              onClick={ () => handleClick(ingredient) }
              className="button"
            >
              <div data-testid={ `${index}-ingredient-card` } className="Card">
                <img
                  src={ `https://www.the${query}db.com/images/ingredients/${ingredient}-Small.png` }
                  alt={ ingredient }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ingredient}</p>
              </div>
            </button>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (url) => dispatch(fetchSearch(url)),
  doNotFetch: () => dispatch(dontFetch()),
});

Ingredients.propTypes = {
  fetchRecipes: func,
  doNotFetch: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Ingredients);
