export default function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(keyName) {
  const userMail = JSON.parse(localStorage.getItem(keyName));
  if (userMail === null) {
    return null;
  }
  return userMail.email;
}
