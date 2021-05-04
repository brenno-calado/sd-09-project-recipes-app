import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreRecipes({ match: { url } }) {
  const linkType = url.split('/').pop();
  const recipeType = linkType === 'comidas' ? 'Meal' : 'Drink';
  const headerTitle = linkType === 'comidas' ? 'Comidas' : 'Bebidas';
  const endpoint = linkType === 'comidas'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const responseType = linkType === 'comidas' ? 'meals' : 'drinks';

  const [surpriseMeLink, setSurpriseMeLink] = useState('');
  const [creatingLink, setCreatingLink] = useState(true);

  useEffect(() => {
    async function getSurpriseMeLink() {
      try {
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        const recipeId = jsonResponse[responseType][0][`id${recipeType}`];
        setSurpriseMeLink(`/${linkType}/${recipeId}`);
        setCreatingLink(false);
      } catch (error) {
        console.error(error);
      }
    }
    getSurpriseMeLink();
  }, [recipeType, endpoint, linkType, responseType]);

  function renderExploreByIngredientsButton() {
    return (
      <Link to={ `/explorar/${linkType}/ingredientes` }>
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
    );
  }

  function renderExploreByAreaButton() {
    if (linkType !== 'comidas') return;
    return (
      <Link to={ `/explorar/${linkType}/area` }>
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
    );
  }

  function renderSurpriseMeButton() {
    return (
      <Link to={ surpriseMeLink }>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
    );
  }

  if (creatingLink) return <h3>Loading...</h3>;
  return (
    <div>
      <Header title={ `Explorar ${headerTitle}` } />
      { renderExploreByIngredientsButton() }
      { renderExploreByAreaButton() }
      { renderSurpriseMeButton() }
      <Footer />
    </div>
  );
}

ExploreRecipes.propTypes = {
  url: string,
}.isRequired;

export default ExploreRecipes;
