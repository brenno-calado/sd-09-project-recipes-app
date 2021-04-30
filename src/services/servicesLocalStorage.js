// setItem
export function setItemLocalStorage(key, value) {
  let result = value;

  if (key !== 'mealsToken' || key !== 'cocktailsToken') {
    result = JSON.stringify(value);
  }

  localStorage.setItem(key, result);
}

// getItem
export function getItemLocalStorage(key) {
  let result = localStorage.getItem(key);

  if (key !== 'mealsToken' || key !== 'cocktailsToken') {
    result = JSON.parse(result);
  }

  return result;
}
