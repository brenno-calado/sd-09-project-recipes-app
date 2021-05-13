export const DONERECIPES_ACTION = 'DONERECIPES_ACTION';

export const doneRecipesAction = (doneRecipes) => ({
  type: DONERECIPES_ACTION, doneRecipes });

export const FAVORITERECIPES_ACTION = 'FAVORITERECIPES_ACTION';

export const favoriteRecipesAction = (favoriteRecipes) => ({
  type: FAVORITERECIPES_ACTION, favoriteRecipes });

export const INPROGRESSRECIPES_ACTION = 'INPROGRESSRECIPES_ACTION';

export const inProgressRecipesAction = (inProgressRecipes) => {
  let progress = inProgressRecipes;

  if (!inProgressRecipes) {
    progress = {};
  }

  return ({
    type: INPROGRESSRECIPES_ACTION,
    progress,
  });
};
