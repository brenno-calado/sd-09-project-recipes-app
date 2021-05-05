import React, { useEffect, useState } from 'react';
import { fetchIngredientsMeal } from '../services/index';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

async function FoodsByIngredients() {
  const [loading, isFetch] = useState(true);
  const [dataIngredients, setIngredient] = useState([]);

  function renderIngredientCard(ingredients) {

    return ingredients.map((ingredient, index) => (
      <section key={ index }>
        <img
          src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
          alt={ ingredient.stringredient }
        />
      </section>
    ));
  }

  useEffect(() => {
    isFetch(true);
    const num = 12;
    const result = fetchIngredientsMeal();
    const ingredients = result.slice(0, num);
    setIngredient(ingredients);
    isFetch(false);
    // console.log(ingredients);
  });

  return (
    <>
      <Header pageName="Explorar Ingredientes" />
      { loading ? <h1>Carregando...</h1> : renderIngredientCard(dataIngredients) }
      <FooterMenu />
    </>
  );
}

export default FoodsByIngredients;
