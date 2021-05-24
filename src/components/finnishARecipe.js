import {
  getItemLocalStorage, setItemLocalStorage } from '../services/servicesLocalStorage';

export default function finnishRecipe(currentRecipe, isFood) {
  const doneRecipes = getItemLocalStorage('doneRecipes');
  const type = isFood ? 'Meal' : 'Drink';
  const now = new Date();
  const today = now.getUTCDate();
  const month = now.getUTCMonth();
  const year = now.getUTCFullYear();
  const currLocalDate = `${today}/${month}/${year}`;
  const recipeSummary = {
    id: currentRecipe[`id${type}`],
    type: isFood ? 'comida' : 'bebida',
    area: isFood ? currentRecipe.strArea : '',
    category: currentRecipe.strCategory,
    alcoholicOrNot: !isFood ? currentRecipe.strAlcoholic : '',
    name: currentRecipe[`str${type}`],
    image: currentRecipe[`str${type}Thumb`],
    doneDate: currLocalDate,
    tags: currentRecipe.tags ? [currentRecipe.tags.split(',')] : [],
  };
  const updatedDoneArray = [...(doneRecipes || []), recipeSummary];

  setItemLocalStorage('doneRecipes', updatedDoneArray);
}
