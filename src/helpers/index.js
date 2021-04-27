export default function setStorage(key, value) {
  // if (typeof value === 'object') {
  localStorage.setItem(key, JSON.stringify(value));
  // } else {
  //   localStorage.setItem(key, value);
  // }
}
