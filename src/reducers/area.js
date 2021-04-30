import { AREA_FETCHING, AREA_RESOLVED, AREA_REJECTED, AREA_FOOD } from '../actions/areas';

const INITIAL_STATE = {
  areas: [],
  loading: true,
  error: '',
  filteredAreas: [],
};

const setAreas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AREA_FETCHING:
    return { ...state, loading: true };
  case AREA_RESOLVED:
    return { ...state, loading: false, areas: action.data };
  case AREA_REJECTED:
    return { ...state, loading: false, error: action.error };
  case AREA_FOOD:
    return { ...state, loading: false, filteredAreas: action.data };
  default:
    return state;
  }
};

export default setAreas;
