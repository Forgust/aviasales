import { nanoid } from 'nanoid';
import { actionTypes } from './actions';

const [
  TOGGLE_CHECKBOX,
  TOGGLE_PRICE_BTN,
  FETCH_SEARCH_ID_SUCCESS,
  FETCH_SEARCH_ID_ERROR,
  FETCH_SEARCH_DATA_REQUEST,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_ERROR,
  GET_NEXT_FIVE_TICKETS,
] = actionTypes;

const initialStateData = {
  all: true,
  noTransfers: true,
  oneTransfer: true,
  twoTransfers: true,
  threeTransfers: true,
  data: [],
  error: false,
  stop: false,
  hasData: false,
  tickets: [],
  ticketsInPage: 5,
  filteredTickets: [],
  activePrice: null,
  requestId: null,
  searchId: null,
  resId: null,
};

const aviaApiReducer = (state = initialStateData, action) => {
  switch (action.type) {
    case FETCH_SEARCH_ID_SUCCESS:
      return { ...state, searchId: action.payload };
    case FETCH_SEARCH_ID_ERROR:
      return { ...state, error: true };
    case FETCH_SEARCH_DATA_REQUEST:
      return { ...state, stop: false, error: false };
    case FETCH_SEARCH_DATA_SUCCESS: {
      const resId = nanoid();
      const { tickets: oldTickets } = state;
      const data = action.payload;
      const newTickets = oldTickets.concat(data.tickets);
      const stop = data.stop;

      const newFilteredTickets = newTickets.filter((ticket) => {
        const stopsLengthThere = ticket.segments[0].stops.length;
        const stopsLengthBack = ticket.segments[1].stops.length;
        if (state.noTransfers && stopsLengthThere === 0 && stopsLengthBack === 0) return true;
        if (state.oneTransfer && stopsLengthThere === 1 && stopsLengthBack === 1) return true;
        if (state.twoTransfers && stopsLengthThere === 2 && stopsLengthBack === 2) return true;
        if (state.threeTransfers && stopsLengthThere === 3 && stopsLengthBack == 3) return true;
        return false;
      });
      return {
        ...state,
        hasData: true,
        error: false,
        data: data,
        tickets: newTickets,
        stop: stop,
        resId: resId,
        filteredTickets: newFilteredTickets,
      };
    }

    case FETCH_SEARCH_DATA_ERROR: {
      const errorResId = nanoid();
      return { ...state, stop: false, error: true, resId: errorResId };
    }

    case GET_NEXT_FIVE_TICKETS:
      if (!state.hasData) {
        return state;
      } else {
        const { ticketsInPage } = state;
        const newTicketsInPage = ticketsInPage + 5;
        return { ...state, ticketsInPage: newTicketsInPage };
      }
    case TOGGLE_PRICE_BTN: {
      let sortPriceTickets = [];
      const { tickets } = state;
      if (action.payload === 'lowPrice') {
        sortPriceTickets = tickets.sort((a, b) => a.price - b.price);
      } else if (action.payload === 'hightSpeed') {
        sortPriceTickets = tickets.sort((a, b) => {
          const totalDurationA = a.segments[0].duration + a.segments[1].duration;
          const totalDurationB = b.segments[0].duration + b.segments[1].duration;
          return totalDurationA - totalDurationB;
        });
      }
      return { ...state, activePrice: action.payload, tickets: sortPriceTickets, filteredTickets: sortPriceTickets };
    }

    case TOGGLE_CHECKBOX: {
      const { payload } = action; //текущий чекбокс
      let resState = {};
      const newState = { ...state, [payload]: !state[payload] }; //сменяем состояние чекбокса
      const isAllChecked = () => {
        //проверяем все ли активны
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
      if (payload === 'all') {
        //проверяем если нажали на 'все'
        if (newState.all) {
          //если новое состояние активное то все галочки делаем активными
          resState = {
            ...state,
            all: true,
            noTransfers: true,
            oneTransfer: true,
            twoTransfers: true,
            threeTransfers: true,
          };
        } else {
          //иначе все галочки деактивируем
          resState = {
            ...newState,
            noTransfers: false,
            oneTransfer: false,
            twoTransfers: false,
            threeTransfers: false,
          };
        }
      } else {
        //если нажали чтото кроме 'все'
        if (state.all) {
          //если активна 'все' то ее деактивируем
          resState = { ...newState, all: false };
        } else if (isAllChecked()) {
          resState = { ...newState, all: true };
        } else {
          resState = newState;
        }
      }
      //белое фильтрованное

      const filteredTickets = state.tickets.filter((ticket) => {
        const stopsLengthThere = ticket.segments[0].stops.length;
        const stopsLengthBack = ticket.segments[1].stops.length;
        if (resState.noTransfers && stopsLengthThere === 0 && stopsLengthBack === 0) return true;
        if (resState.oneTransfer && stopsLengthThere === 1 && stopsLengthBack === 1) return true;
        if (resState.twoTransfers && stopsLengthThere === 2 && stopsLengthBack === 2) return true;
        if (resState.threeTransfers && stopsLengthThere === 3 && stopsLengthBack == 3) return true;
        return false;
      });
      return { ...resState, filteredTickets: filteredTickets };
    }

    default:
      return state;
  }
};

export { aviaApiReducer };
