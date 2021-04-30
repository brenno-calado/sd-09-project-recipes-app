const getDoneRecipes = () => {
  /* if (localStorage.length !== 0) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipes !== undefined ? doneRecipes : 'Key not found';
  } */
  const data = [
    {
      id: 52846,
      type: 'meals',
      area: 'Japanese',
      category: 'Chicken',
      alcoholicOrNot: '',
      name: 'Chicken & mushroom Hotpot',
      image: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
      doneDate: '2016-08-18',
      tags: ['bun', 'baking', 'xablau'],
    },
    {
      id: 11007,
      type: 'drinks',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'Margarita',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      doneDate: '2015-08-14',
      tags: [],
    },
  ];
  return data;
};

export default getDoneRecipes;
