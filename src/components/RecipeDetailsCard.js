import React, { useContext } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { GrFavorite } from 'react-icons/gr';
import { RecipiesContext } from '../context/RecipiesContext';

function RecipesDetailsCard({ recipesList, thumbUrl, title, category }) {
  const { searchMealsList, searchDrinksList } = useContext(RecipiesContext);
  console.log(searchMealsList[0]);

  return (
    <section>
      <img src={ thumbUrl } alt="Foto da receita" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ title }</h1>
      <button type="button" data-testid="share-btn">
        <AiOutlineShareAlt />
      </button>
      <button type="button" data-testid="favorite-btn">
        <GrFavorite />
      </button>
      <div>
        <p data-testid="recipe-category">{category}</p>
      </div>
      <div>
        Ingredientes
        <ul>
          {/* {ingredients.map()} */}
        </ul>
      </div>
    </section>
  );
}

export default RecipesDetailsCard;
