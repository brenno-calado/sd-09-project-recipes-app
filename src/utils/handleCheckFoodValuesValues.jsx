function useHandleCheckFoodValuesValues() {
  function handleCheckFoodValuesValues({ target }, apiData) {
    if (target.checked) {
      const mealId = apiData.meals[0].idMeal;
      const getLocal = localStorage.inProgressRecipes
        && JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (!getLocal || !getLocal.meals) {
        const localFoods = {
          ...getLocal,
          meals: {
            [mealId]: [target.name],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(localFoods));
      } else if (getLocal && (getLocal.cocktails || getLocal.meals)) {
        const localFoods = {
          ...getLocal,
          meals: {
            ...getLocal.meals,
            [mealId]: getLocal.meals[mealId]
              ? [...getLocal.meals[mealId], target.name] : [target.name],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(localFoods));
      }
    }
    if (!target.checked) {
      const mealId = apiData.meals[0].idMeal;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const removeLocal = getLocal && getLocal.meals[mealId]
        .filter((item) => item !== target.name);

      const localFoods = {
        meals: {
          ...getLocal.meals,
          [mealId]: removeLocal,
        },
      };
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localFoods));
    }
  }
  return [handleCheckFoodValuesValues];
}
export default useHandleCheckFoodValuesValues;
