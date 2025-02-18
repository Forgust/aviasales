/*eslint-disable*/
import { TOGGLE_CHECKBOX } from './actions';

const initialState = {
  all: false,
  noTransfers: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const checkboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX:
      const { payload } = action; // Получаем название чекбокса и меняем его состояние
      const newState = { ...state, [payload]: !state[payload] };
      const isAllChecked = () => {
        if (!newState.all) {
          const { noTransfers, oneTransfer, twoTransfers, threeTransfers } = newState;
          if (noTransfers && oneTransfer && twoTransfers && threeTransfers) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      };

      // Логика для управления состоянием чекбоксов
      if (payload === 'all') {
        // Если включаем "Все"

        if (newState.all) {
          return {
            all: true,
            noTransfers: true,
            oneTransfer: true,
            twoTransfers: true,
            threeTransfers: true,
          };
        } else {
          // Если снимаем "Все"
          return { ...newState, noTransfers: false, oneTransfer: false, twoTransfers: false, threeTransfers: false };
        }
      } else {
        if (state.all) {
          // Если снимаем любую галочку при включенной "Все"
          return { ...newState, all: false };
        } else if (isAllChecked()) {
          //если ставим любую галочку при выключеной "все"
          return { ...newState, all: true };
        }
        return newState;
      }

    default:
      return state;
  }
};
export default checkboxReducer;
/*eslint-enable*/
