const localStorageProgress = () => {
  const inProgressRecipes = {
    cocktails: {},
    meals: {},
  };

  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
};

export default localStorageProgress;
