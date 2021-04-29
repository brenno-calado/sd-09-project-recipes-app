import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function ExploreIngredients({ match: { url } }) {
  const linkType = url.split('/')[2];
  const responseType = linkType === 'comidas' ? 'meals' : 'drinks';
  const ingredientStr = linkType === 'comidas' ? 'strIngredient' : 'strIngredient1';
  const database = linkType === 'comidas' ? 'themealdb' : 'thecocktaildb';
  const endpoint = linkType === 'comidas'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  const [fetchingIngredients, setFetchingIngredients] = useState(true);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        const visibleIngrendients = 12;
        setIngredientsList(jsonResponse[responseType].slice(0, visibleIngrendients));
        setFetchingIngredients(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchIngredients();
  }, [endpoint, responseType]);

  if (fetchingIngredients) return <h3>Loading...</h3>;
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { ingredientsList.map((ingredient, index) => (
        <IngredientCard
          key={ ingredient[ingredientStr] }
          ingredient={ ingredient[ingredientStr] }
          db={ database }
          index={ index }
        />
      ))}
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  url: string,
}.isRequired;

export default ExploreIngredients;
