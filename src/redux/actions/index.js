import { SAVE_PATH } from './actionTypes';

export const savePath = (pathname) => ({
  type: SAVE_PATH,
  pathname,
});
