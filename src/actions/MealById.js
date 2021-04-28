import { fetchMealById, fetchRecommendedMealById } from '../services/fetchMealById';

export const IS_FETCHING = 'IS_FETCHING';
export const IS_RESOLVED = 'IS_RESOLVED';
export const IS_RESOLVED_RECOMMENDED_FOODS = 'IS_RESOLVED_RECOMMENDED_FOODS';
export const IS_REJECTED = 'IS_REJECTED';

const isFetching = () => ({
  type: IS_FETCHING,
});

const isRejected = (error) => ({
  type: IS_REJECTED,
  error,
});

const isResolved = (data) => ({
  type: IS_RESOLVED,
  data,
});

const isResolvedRecommendedFoods = (data) => ({
  type: IS_RESOLVED_RECOMMENDED_FOODS,
  data,
});

export const getMealById = (ID) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const responseMeal = await fetchMealById(ID);

    const responseRecommended = await fetchRecommendedMealById(responseMeal
      .meals[0].strCategory);
    dispatch(isResolved(responseMeal.meals[0]));
    dispatch(isResolvedRecommendedFoods(responseRecommended));
    return null;
  } catch (error) {
    dispatch(isRejected(error));
  }
};
export function mapIngredientToMeasure(selectedRecipe) {
  const regexIngredient = new RegExp(/strIngredient/, 'g');
  const regexMeasure = new RegExp(/strMeasure/, 'g');
  let indexCountIngredient = 0;
  let indexCountMeasure = 0;
  const ingredientArray = [];
  const measureArray = [];
  const mapIngredientToMeasureArray = [];
  Object.entries(selectedRecipe).map((item) => {
    const object = {};
    const [key, value] = item;

    if (key.match(regexIngredient)) {
      object.value = value;
      object.index = indexCountIngredient;
      ingredientArray.push(object);
      indexCountIngredient += 1;
    }
    if (key.match(regexMeasure)) {
      object.value = value;
      object.index = indexCountMeasure;
      measureArray.push(object);
      indexCountMeasure += 1;
    }
    return null;
  });
  ingredientArray.map((ingredient) => {
    const object = {};
    measureArray.map((measure) => {
      if (ingredient.index === measure.index) {
        object.index = ingredient.index;
        object.ingredient = ingredient.value;
        object.measure = measure.value;
        mapIngredientToMeasureArray.push(object);
      }
      return null;
    });
    return null;
  });
  return mapIngredientToMeasureArray;
}
