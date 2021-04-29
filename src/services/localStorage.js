export default function setLocalStorage(key, name) {
  localStorage.setItem(key, name);
}

export const handleDone = (recipe, query) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const doneRecipe = {
    id: recipe[`id${query}`],
    type: query === 'Meal' ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[`str${query}`],
    image: recipe[`str${query}Thumb`],
    doneDate: new Date().toLocaleDateString(),
    tags: recipe.strTags ? recipe.strTags.split(',') : '',
  };
  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
};
