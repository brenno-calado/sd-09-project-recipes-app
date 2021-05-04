function useHandleCheckDrinkValues() {
  function handleCheckDrinkValues({ target }, apiData) {
    if (target.checked) {
      const drinkId = apiData.drinks[0].idDrink;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const getFilteredLocal = getLocal && getLocal.cocktails[drinkId]
        .filter((item, index) => getLocal.cocktails[drinkId].indexOf(item) === index);

      const localDrinks = {
        cocktails: {
          [drinkId]: getLocal ? [...getFilteredLocal, target.name] : [target.name],
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localDrinks));
    }

    if (!target.checked) {
      const drinkId = apiData.drinks[0].idDrink;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const removeLocal = getLocal && getLocal.cocktails[drinkId]
        .filter((item) => item !== target.name);

      const localDrinks = {
        cocktails: {
          [drinkId]: removeLocal,
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localDrinks));
    }
  }
  return [handleCheckDrinkValues];
}

export default useHandleCheckDrinkValues;
