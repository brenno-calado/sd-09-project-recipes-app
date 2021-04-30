import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import CardIngredient from '../../Components/CardIngredient/CardIngredient';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RecipeContext } from '../../Context';

function ExploreForIngredient() {
  const { setRecipies, setTypeRecipies } = useContext(RecipeContext);
  const [pageType, setPageType] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    if (pageType === '') {
      let page = pathname;
      page = page.replace('/explorar/', '').replace('/ingredientes', '');
      setPageType(page);
    }
  }, [setPageType, pageType, pathname]);

  useEffect(() => {
    if (pageType === 'comidas' && ingredients.length === 0) {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json())
        .then((result) => setIngredients(result.meals
          .map((ingredient) => ingredient.strIngredient)));
    }
    if (pageType === 'bebidas' && ingredients.length === 0) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json())
        .then((result) => setIngredients(result.drinks
          .map((ingredient) => ingredient.strIngredient1)));
    }
    console.log(ingredients);
  }, [pageType, ingredients]);

  const fetchRecipies = (ingredient) => {
    setTypeRecipies(pageType);
    if (pageType === 'comidas') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((response) => response.json())
        .then((result) => setRecipies(result.meals));
    }
    if (pageType === 'bebidas') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((response) => response.json())
        .then((result) => setRecipies(result.drinks));
    }
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div>
        { (ingredients.length > 0) && ingredients
          .map((ingredient, index) => (index < '12')
          && (
            <Link
              key={ ingredient }
              onClick={ () => fetchRecipies(ingredient) }
              to={ `/${pageType}` }
            >
              <CardIngredient
                ingredient={ ingredient }
                index={ index }
                pageType={ pageType }
              />
            </Link>))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreForIngredient;
