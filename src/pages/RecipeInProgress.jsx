import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);
  const [itemsChecked, setItemsChecked] = useState([]);
  const [disableBtnFinished, setDisableBtnFinished] = useState(true);

  const [ingredients, setIngredient] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [details, setDetails] = useState({});

  const id = history.location.pathname.replace(/\D/g, '');
  const type = history.location.pathname.split('/')[1];

  function filterIngredients(obj) {
    const recipe = Object.entries(obj);
    const ingredientsKeyValue = recipe
      .filter((item) => ((item[0].includes('strIngredient')) && item[1]));
    setIngredient(ingredientsKeyValue.map((item) => (item[1])));
  }

  useEffect(() => {
    console.log(ingredients.length)
    console.log(itemsChecked.length)
    if (ingredients.length === itemsChecked.length) {
      return setDisableBtnFinished(false);
    }
    setDisableBtnFinished(true);
  }, [ingredients, itemsChecked]);

  useEffect(() => {
    const objItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (objItems) {
      const arrayItems = Object.values(Object.entries(objItems)[0][1])[0];
      return setItemsChecked(arrayItems);
    }
  }, []);

  useEffect(() => {
    if (type === 'comidas') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then(({ meals }) => {
          filterIngredients(meals[0]);
          setInstructions(meals[0].strInstructions);
          setDetails({
            id,
            type,
            area: meals[0].strArea,
            category: meals[0].strCategory,
            alcoholicOrNot: '',
            name: meals[0].strMeal,
            image: meals[0].strMealThumb,
          });
        });
    } else if (type === 'bebidas') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then(({ drinks }) => {
          filterIngredients(drinks[0]);
          setInstructions(drinks[0].strInstructions);
          setDetails({
            id,
            type,
            area: drinks[0].strArea,
            category: drinks[0].strCategory,
            alcoholicOrNot: drinks[0].strAlcoholic,
            name: drinks[0].strDrink,
            image: drinks[0].strDrinkThumb,
          });
        });
    }
  }, [id, type]);

  function handleClick() {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([details]));
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  }

  function rendeImage() {
    return (
      <img data-testid="recipe-photo" src={ details.image } alt="Imagem da receita" />);
  }

  function rendeTitle() {
    return (<h2 data-testid="recipe-title">{details.title}</h2>);
  }

  function rendeCategory() {
    return (<p data-testid="recipe-category">{details.category}</p>);
  }

  function btnShare() {
    const twelve = 12;
    return (
      <button
        data-testid="share-btn"
        type="button"
        onClick={ async () => {
          await navigator.clipboard
            .writeText(`http://localhost:3000${history.location.pathname.slice(0, -twelve)}`);
          alert('Link copiado!');
          console.log(`http://localhost:3000${history.location.pathname.slice(0, -twelve)}`)
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
    );
  }

  function btnFavorite() {
    return (
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleClick }
      >
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="Favoritar" />
      </button>
    );
  }

  function isChecked(target) {
    if (type === 'comida') {
      setItemsChecked([...itemsChecked, target.value]);
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [id]: [...itemsChecked, target.value] } }));
    }
    return localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { [id]: [...itemsChecked, target.value] } }));
  }

  function disChecked(target) {
    if (itemsChecked.includes(target.value)) {
      setItemsChecked(itemsChecked.filter((item) => item !== target.value));
    }
  }

  function handleCheck({ target }) {
    if (target.checked && !itemsChecked.includes(target.value)) {
      setItemsChecked([...itemsChecked, target.value]);
      return isChecked(target);
    }
    return disChecked(target);
  }

  function henderIngredients() {
    return (
      <>
        <h3>Ingredients</h3>
        { ingredients.map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ { display: 'block' } }
          >
            <input
              id={ ingredient }
              type="checkbox"
              onChange={ handleCheck }
              value={ ingredient }
              checked={ itemsChecked.includes(ingredient) }
            />
            { ingredient }
          </label>
        )) }
      </>
    );
  }

  function henderInstructions() {
    return (
      <>
        <h3>Instructions</h3>
        <p data-testid="instructions">{instructions}</p>
      </>
    );
  }

  function btnFinished() {
    return (
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ disableBtnFinished }
        onClick={ () => { history.push('/receitas-feitas'); } }
      >
        Finished
      </button>
    );
  }

  return (
    <div>
      { rendeImage() }
      { rendeTitle() }
      { rendeCategory() }
      { btnShare() }
      { btnFavorite() }
      { (ingredients.length > 0) ? henderIngredients() : <h1>{ingredients}</h1> }
      { henderInstructions() }
      { btnFinished() }
    </div>
  );
}

export default RecipeInProgress;
