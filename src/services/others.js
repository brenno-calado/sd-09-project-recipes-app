export function getIdFromURL() {
  const path = window.location.pathname;
  const magicNum = 9;
  return path.substr(magicNum);
}

export function getPageFromURL() {
  const path = window.location.pathname;
  return path.includes('comidas');
}

export function getYouTubeLink(recipe) {
  const magicNum = 32;
  const ytId = recipe.strYoutube.substr(magicNum);
  const path = `https://www.youtube.com/embed/${ytId}`;
  return path;
}
