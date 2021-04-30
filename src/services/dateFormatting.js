const dateFormatting = () => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return (`${date}/${month}/${year}`);
};

export default dateFormatting;
