import dateFormatting from './dateFormatting';

export const localStorageInitialState = () => {
  const inProgress = {
    cocktails: {},
    meals: {},
  };
  const myProgress = JSON.parse(localStorage.getItem('inProgress'));
  if (!myProgress) {
    localStorage.setItem('inProgress', JSON.stringify(inProgress));
  }

  const favoriteRecipes = [];
  const myFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!myFavorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  const doneRecipes = [];
  const myDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!myDoneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }
};

export const sendDoneRecipeToLocalStorage = (type, recipe) => {
  let myRecipe = {};
  if (type === 'comida') {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = recipe;
    myRecipe = {
      id: idMeal,
      type,
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: dateFormatting(),
      tags: strTags ? strTags.split(',') : [],
    };
  }
  if (type === 'bebida') {
    const { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic } = recipe;
    myRecipe = {
      id: idDrink,
      type,
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: dateFormatting(),
      tags: [],
    };
  }
  const myStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if ((myStorage.filter((item) => item.id === myRecipe.id)).length === 0) {
    myStorage.push(myRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(myStorage));
  }
};
