const fetchSearchBar = async (url) => {
  const fetchItems = await fetch(url);
  const items = await fetchItems.json();
  const type = Object.keys(items);
  return items[type];
};

export default fetchSearchBar;
