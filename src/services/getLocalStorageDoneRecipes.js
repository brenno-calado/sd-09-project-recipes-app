const getDoneRecipes = () => {
  if (localStorage.length !== 0) {
    return JSON.parse(localStorage.getItem('doneRecipes'));
  }
};

export default getDoneRecipes;
