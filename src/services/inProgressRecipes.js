const addRecipeInProgress = (recipesType, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    const newProgressRecipes = {
      ...inProgressRecipes,
      [recipesType]: {
        ...inProgressRecipes[recipesType],
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipes));
  } else {
    const newProgressRecipes = {
      ...inProgressRecipes,
      [recipesType]: {
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipes));
  }
};

const checkRecipesInProgress = (recipesType, id, setProgress) => {
  recipesType = recipesType === 'drinks' ? 'cocktails' : recipesType;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes && inProgressRecipes[recipesType]) {
    const inProgressRecipesList = Object.keys(inProgressRecipes[recipesType]);
    if (inProgressRecipesList.includes(id)) {
      setProgress(true);
    }
  }
};

export { addRecipeInProgress, checkRecipesInProgress };
