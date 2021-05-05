import types from '../types';
import { categoriesFetch } from '../../services/api';

const { GET_CATEGORIES, REQUEST_CATEGORIES } = types;

const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

const fetchCategories = (foods) => (
  (dispatch) => {
    dispatch(requestCategories());
    return categoriesFetch(foods)
      .then((response) => {
        const categories = Object.entries(response)[0][1];
        dispatch(getCategories(categories));
      });
  }
);

export default fetchCategories;
