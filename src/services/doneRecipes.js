export default function saveAsDone(id, recipe, pathname) {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const currentDate = (`${date}/${month}/${year}`);
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
      doneDate: currentDate,
      tags: recipe.strTags ? [recipe.strTags] : [],
    };
    const newDoneDrink = {
      id,
      type: 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: currentDate,
      tags: recipe.strTags ? [recipe.strTags] : [],
    };
    doneList.push(pathname.includes('comidas') ? newDoneFood : newDoneDrink);
    localStorage.setItem('doneRecipes', JSON.stringify(doneList));
  }
  // else {
  //   const newList = doneList.filter((item) => item.id !== id);
  //   localStorage.setItem('doneRecipes', JSON.stringify(newList));
  // }
}
