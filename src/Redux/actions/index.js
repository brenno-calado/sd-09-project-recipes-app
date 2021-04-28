import { SEARCH, REQ_SEARCH, SET_SEARCH } from './actionTypes';
import fetchSearchBar from '../../services';

export const searchBar = () => ({ type: SEARCH });

const reqSearch = () => ({ type: REQ_SEARCH });

const setSearch = (items) => ({ type: SET_SEARCH, items });

export const fetchSearch = (url) => {
  return async (dispatch) => {
    dispatch(reqSearch());
    const items = await fetchSearchBar(url);
    return dispatch(setSearch(items));
  };
};
