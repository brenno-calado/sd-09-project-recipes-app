function endRecipeButton({ id,
  match,
  area,
  tags,
  image,
  title,
  category,
  style }) {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const currentDate = (`${date}/${month}/${year}`);
  const { path } = match;
  if (path === '/bebidas/:id/in-progress') {
    const doneDrink = {
      id,
      key: id,
      type: 'bebida',
      area: '',
      category: style,
      alcoholicOrNot: category,
      name: title,
      image,
      doneDate: currentDate,
      tags: tags ? [tags] : [],
    };
    const localStorageDrinkNegotiator = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes',
      JSON.stringify(localStorageDrinkNegotiator
        ? [...localStorageDrinkNegotiator, doneDrink] : [doneDrink]));
  }
  if (path === '/comidas/:id/in-progress') {
    const doneFood = {
      id,
      key: id,
      type: 'comida',
      area,
      category: style,
      alcoholicOrNot: '',
      name: title,
      image,
      doneDate: currentDate,
      tags: tags ? [tags] : [],
    };
    const localStorageFoodNegotiator = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes',
      JSON.stringify(localStorageFoodNegotiator
        ? [...localStorageFoodNegotiator, doneFood] : [doneFood]));
  }
}

export default endRecipeButton;
