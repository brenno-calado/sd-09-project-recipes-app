export default function saveAsDone(id, recipe, pathname) {
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  const doneList = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneList.some((item) => item.id === id)) {
    const newDoneFood = {
      id,
      type: 'comida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    const newDoneDrink = {
      id,
      type: 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    doneList.push(pathname.includes('comidas') ? newDoneFood : newDoneDrink);
    localStorage.setItem('doneRecipes', JSON.stringify(doneList));
  }
  // else {
  //   const newList = doneList.filter((item) => item.id !== id);
  //   localStorage.setItem('doneRecipes', JSON.stringify(newList));
  // }
}
