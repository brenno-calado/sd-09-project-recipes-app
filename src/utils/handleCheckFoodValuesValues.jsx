function useHandleCheckFoodValuesValues() {
  function handleCheckFoodValuesValues({ target }, apiData) {
    if (target.checked) {
      const mealId = apiData.meals[0].idMeal;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const getFilteredLocal = getLocal && getLocal.meals[mealId]
        .filter((item, index) => getLocal.meals[mealId].indexOf(item) === index);

      const localFoods = {
        meals: {
          [mealId]: getLocal ? [...getFilteredLocal, target.name] : [target.name],
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localFoods));
    }

    if (!target.checked) {
      const mealId = apiData.meals[0].idMeal;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const removeLocal = getLocal && getLocal.meals[mealId]
        .filter((item) => item !== target.name);

      const localFoods = {
        meals: {
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
