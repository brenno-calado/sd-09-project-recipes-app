const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes') || '[]');

export default getDoneRecipes;
