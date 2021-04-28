export default function setStorage(key, value) {
  // if (typeof value === 'object') {
  localStorage.setItem(key, JSON.stringify(value));
  // } else {
  //   localStorage.setItem(key, value);
  // }
}

export function getStorage(keyName) {
  const userMail = JSON.parse(localStorage.getItem(keyName));
  if (userMail === null) {
    return null;
  }
  return userMail.email;
}
