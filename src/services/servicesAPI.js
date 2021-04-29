// Fetch
export default async function getFoodsAndDrinks(type, param, value) {
  const objectParams = {
    getAll: 'search.php?s=',
    getByCategory: 'list.php?c=list',
    getById: `lookup.php?i=${value}`,

    getIngredient: 'list.php?i=list',
    getOrigin: 'list.php?a=list', // só para FOOD (Tela explorar, FOOD com 3 botões e DRINK com 2)
    getRandom: 'random.php', // redireciona para a receita escolhida pelo ramdom (Tela de detalhe da Receita)

    getIngredientByValue: `filter.php?i=${value}`,
    getNameByValue: `search.php?s=${value}`,
    getFirstLetterByValue: `search.php?f=${value}`,
  };

  const endpoint = `https://www.${type === 'food' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/${objectParams[param]}`;

  console.log(endpoint);

  const request = await fetch(endpoint);
  const data = await request.json();

  return data;
}

// Função para imagem
