function useHandleFavoriteDrinks() {
  function handleFavorite({ apiData, id, drinksLocal, favorite, setFavorite }) {
    setFavorite(!favorite);
    if (apiData && !favorite) {
      apiData.drinks.forEach(({
        idDrink,
        strCategory,
        strAlcoholic,
        strDrink,
        strDrinkThumb,
      }) => {
        const drinks = {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb };
        localStorage.setItem('favoriteRecipes',
          JSON.stringify(localStorage.length > 0 ? [...drinksLocal, drinks] : [drinks]));
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

export default useHandleFavoriteDrinks;
