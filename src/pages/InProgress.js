import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import createIngredientsArray from '../services/createIngredientsArray';

const InProgress = () => {
  const [loading, setLoading] = useState(true);
  const [myRecipe, setMyRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const myId = pathname.split('/')[2];

  const fetchSingleRecipeAPI = async (id) => {
    const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((data) => data.meals[0]);
    setMyRecipe(recipe);
  };

  const handleChecked = ({ target }) => {
    console.log(target);
  };

  // CSS pra fazer depois
  const imgStyle = {
    maxWidth: '200x',
    maxHeight: '200px',
    margin: 'auto',
    borderRadius: '50px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  };

  const buttonContainer = {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
  };
  // fim do css

  useEffect(() => {
    fetchSingleRecipeAPI(myId);
    setLoading(false);
  }, [myId]);

  useEffect(() => {
    setIngredients(createIngredientsArray(myRecipe));
  }, [myRecipe]);

  if (loading) return (<p>Loading...</p>);
  const { strMeal, strMealThumb, strCategory, strInstructions } = myRecipe;
  return (
    <div style={ containerStyle }>
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h4 data-testid="recipe-category">{strCategory}</h4>

      <div style={ buttonContainer }>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>

        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>

      <img
        src={ strMealThumb }
        alt={ strMeal }
        style={ imgStyle }
        data-testid="recipe-photo"
      />

      <div>
        { ingredients.map((ingredient, index) => (
          <div
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ ingredient }>
              <input
                type="checkbox"
                name={ ingredient }
                value={ index }
                id={ ingredient }
                onClick={ handleChecked }
              />
              { ingredient }
            </label>
          </div>
        )) }
      </div>
      <div>
        <p
          data-testid="instructions"
        >
          {strInstructions}
        </p>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
};

export default InProgress;
