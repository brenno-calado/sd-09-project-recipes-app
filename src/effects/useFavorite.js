import { useEffect } from 'react';

const useFavorite = (id, setFavoriteState) => {
  useEffect(() => {
    const verifyFavorite = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (!favoriteRecipes) localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      if (favoriteRecipes && favoriteRecipes
        .find((drink) => drink.id === id)) setFavoriteState(true);
    };
    verifyFavorite();
  }, [id, setFavoriteState]);
};

export default useFavorite;
