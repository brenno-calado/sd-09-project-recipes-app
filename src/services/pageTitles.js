import paths from '../routes/paths';

const {
  // LOGIN,
  FOODS,
  DRINKS,
  EXPLORE,
  EXPLORE_FOOD,
  EXPLORE_DRINK,
  FOOD_BY_INGREDIENTS,
  DRINK_BY_INGREDIENTS,
  FOOD_BY_AREA,
  PROFILE_PAGE,
  DONE_RECIPES,
  FAVORITE_RECIPES,
} = paths;

const getPageTitle = (path) => {
  switch (path) {
  case FOODS:
    return 'Comidas';
  case DRINKS:
    return 'Bebidas';
  case EXPLORE:
    return 'Explorar';
  case EXPLORE_FOOD:
    return 'Explorar Comidas';
  case EXPLORE_DRINK:
    return 'Explorar Bebidas';
  case FOOD_BY_INGREDIENTS:
    return 'Explorar Ingredientes';
  case DRINK_BY_INGREDIENTS:
    return 'Explorar Ingredientes';
  case FOOD_BY_AREA:
    return 'Explorar Origem';
  case PROFILE_PAGE:
    return 'Perfil';
  case FAVORITE_RECIPES:
    return 'Receitas Favoritas';
  case DONE_RECIPES:
    return 'Receitas Feitas';
  default:
    return '';
  }
};

export default getPageTitle;
