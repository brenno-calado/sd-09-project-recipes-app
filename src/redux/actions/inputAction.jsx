const INPUT_CHANGE = 'INPUT_CHANGE';

const inputAction = (checked) => ({
  type: INPUT_CHANGE,
  checked,
});

export default inputAction;
