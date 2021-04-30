import fetchAreas, { fetchFoodAreas } from '../services/fetchArea';

export const AREA_FETCHING = 'AREA_FETCHING';
export const AREA_RESOLVED = 'AREA_RESOLVED';
export const AREA_REJECTED = 'AREA_REJECTED';
export const AREA_FOOD = 'AREA_FOOD';

const areaFetching = () => ({
  type: AREA_FETCHING,
});

const areaResolved = (data) => ({
  type: AREA_RESOLVED,
  data,
});

const areaRejected = (error) => ({
  type: AREA_REJECTED,
  error,
});

export const areasFetch = () => async (dispatch) => {
  dispatch(areaFetching());
  try {
    const response = await fetchAreas();
    dispatch(areaResolved(response.meals));
  } catch (error) {
    dispatch(areaRejected(error));
  }
};

export const areasFood = (data) => ({
  type: AREA_FOOD,
  data,
});

export const filterAreasFetch = (value) => async (dispatch) => {
  dispatch(areaFetching());
  try {
    const response = await fetchFoodAreas(value);
    dispatch(areasFood(response.meals));
  } catch (error) {
    dispatch(areaRejected(error));
  }
};
