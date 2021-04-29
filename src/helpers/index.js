export default function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
