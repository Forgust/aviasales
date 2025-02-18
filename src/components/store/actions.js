const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';

const toggleCheckbox = (checkbox) => ({
  type: TOGGLE_CHECKBOX,
  payload: checkbox,
});

export { TOGGLE_CHECKBOX, toggleCheckbox };
