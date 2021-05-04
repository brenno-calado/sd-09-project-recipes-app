function useHandleFavoriteFoods() {
  function handleFavorite({ apiData, id, mealLocal, favorite, setFavorite }) {
    setFavorite(!favorite);
    if (apiData && !favorite) {
      apiData.meals.forEach(({
        idMeal,
        strArea,
        strCategory,
        strMeal,
        strMealThumb,
      }) => {
        const meals = {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb };
        localStorage.setItem('favoriteRecipes',
          JSON.stringify(localStorage.length > 0 ? [...mealLocal, meals] : [meals]));
      });
    }
    if (localStorage && favorite) {
      const repositoresLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const localStorageItem = repositoresLocal
        .filter(({ id: favoriteId }) => favoriteId !== id);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(localStorageItem));
    }
  }
  return [handleFavorite];
}

export default useHandleFavoriteFoods;
