function useHandleCheckDrinkValues() {
  function handleCheckDrinkValues({ target }, apiData) {
    if (target.checked) {
      const drinkId = apiData.drinks[0].idDrink;
      const getLocal = localStorage.inProgressRecipes
        && JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (!getLocal || !getLocal.cocktails) {
        const localDrinks = {
          ...getLocal,
          cocktails: {
            [drinkId]: [target.name],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(localDrinks));
      } else if (getLocal && (getLocal.cocktails || getLocal.meals)) {
        const localDrinks = {
          ...getLocal,
          cocktails: {
            ...getLocal.cocktails,
            [drinkId]: getLocal.cocktails[drinkId]
              ? [...getLocal.cocktails[drinkId], target.name] : [target.name],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(localDrinks));
      }
    }
    if (!target.checked) {
      const drinkId = apiData.drinks[0].idDrink;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const removeLocal = getLocal && getLocal.cocktails[drinkId]
        .filter((item) => item !== target.name);

      const localDrinks = {
        cocktails: {
          ...getLocal.cocktails,
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
