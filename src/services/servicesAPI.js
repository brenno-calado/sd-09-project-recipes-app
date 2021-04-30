// Fetch
export default async function getFoodsAndDrinks(type, param, value) {
  const objectParams = {
    getAll: 'search.php?s=',
    getByCategory: 'list.php?c=list',
    getById: `lookup.php?i=${value}`,

    filterCategory: `filter.php?c=${value}`,

    getIngredient: 'list.php?i=list',
    getOrigin: 'list.php?a=list', // só para FOOD (Tela explorar, FOOD com 3 botões e DRINK com 2)
    getRandom: 'random.php', // redireciona para a receita escolhida pelo ramdom (Tela de detalhe da Receita)

    getIngredientByValue: `search.php?i=${value}`,
    getNameByValue: `search.php?s=${value}`,
    getFirstLetterByValue: `search.php?f=${value}`,
  };

  const endpoint = `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/${objectParams[param]}`;

  const request = await fetch(endpoint);
  const data = await request.json();

  return type === 'meals' ? data.meals : data.drinks;
}
