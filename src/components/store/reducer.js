/*eslint-disable*/
import { actionTypes } from './actions';
const [
  TOGGLE_CHECKBOX,
  FETCH_SEARCH_DATA_REQUEST,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_ERROR,
  GET_NEXT_FIVE_TICKETS,
] = actionTypes;

const initialStateCheckbox = {
  all: false,
  noTransfers: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const initialStateData = {
  data: [],
  error: false,
  loading: false,
  hasData: false,
  currentTickets: [],
  counter: 0,
};

const checkboxReducer = (state = initialStateCheckbox, action) => {
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
          //если ставим все галочки при выключеной "все"
          return { ...newState, all: true };
        }
        return newState;
      }

    default:
      return state;
  }
};

const aviaApiReducer = (state = initialStateData, action) => {
  switch (action.type) {
    case FETCH_SEARCH_DATA_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_SEARCH_DATA_SUCCESS:
      const newData = action.payload;
      const tickets = newData.tickets;
      let counter = state.counter;
      let newCounter = (counter += 5);
      const currentTickets = tickets.slice(0, 5);
      return {
        ...state,
        hasData: true,
        loading: false,
        error: false,
        data: newData,
        tickets: tickets,
        currentTickets: currentTickets,
        counter: newCounter,
      };
    case FETCH_SEARCH_DATA_ERROR:
      return { ...state, loading: false, error: true };
    case GET_NEXT_FIVE_TICKETS:
      if (!state.hasData) {
        return state;
      } else {
        let counter = state.counter;
        let newCounter = (counter += 5);
        const currentTickets = tickets.slice(counter, newCounter);
        return { ...state, counter: newCounter, currentTickets: currentTickets };
      }
    default:
      return state;
  }
};

export { checkboxReducer, aviaApiReducer };
/*eslint-enable*/
