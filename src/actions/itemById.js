import fetchItemById from '../services/fetchItemById';

export const ITEM_FETCHING = 'ITEM_FETCHING';
export const ITEM_RESOLVED = 'ITEM_RESOLVED';
export const ITEM_REJECTED = 'ITEM_REJECTED';

const itemFetching = () => ({
  type: ITEM_FETCHING,
});

const itemResolved = (item) => ({
  type: ITEM_RESOLVED,
  item,
});

const itemRejected = (error) => ({
  type: ITEM_REJECTED,
  error,
});

export const getItemById = (id, path) => async (dispatch) => {
  dispatch(itemFetching());
  try {
    const response = await fetchItemById(id, path);
    dispatch(itemResolved(response));
  } catch (error) {
    dispatch(itemRejected(error));
  }
};
