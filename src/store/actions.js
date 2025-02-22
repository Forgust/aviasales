import { debounce } from 'lodash';
const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
const TOGGLE_PRICE_BTN = 'TOGGLE_PRICE_BTN';

const FETCH_SEARCH_ID_SUCCESS = 'FETCH_SEARCH_ID_SUCCESS';
const FETCH_SEARCH_ID_ERROR = 'FETCH_SEARCH_ID_ERROR';

const FETCH_SEARCH_DATA_REQUEST = 'FETCH_SEARCH_DATA_REQUEST';
const FETCH_SEARCH_DATA_SUCCESS = 'FETCH_SEARCH_DATA_SUCCESS';
const FETCH_SEARCH_DATA_ERROR = 'FETCH_SEARCH_DATA_ERROR';

const GET_NEXT_FIVE_TICKETS = 'GET_NEXT_FIVE_TICKETS';

const apiBase = 'https://aviasales-test-api.kata.academy/';
const search = 'search';
const tickets = 'tickets?searchId=';

export const toggleCheckbox = (checkbox) => ({
  type: TOGGLE_CHECKBOX,
  payload: checkbox,
});

export const togglePriceBtn = (btn) => ({
  type: TOGGLE_PRICE_BTN,
  payload: btn,
});

export const getSearchId = () => {
  return async (dispatch) => {
    try {
      const resId = await fetch(`${apiBase}${search}`);
      const dataId = await resId.json();
      const searchId = dataId.searchId;
      dispatch({ type: FETCH_SEARCH_ID_SUCCESS, payload: searchId });
    } catch (error) {
      dispatch({ type: FETCH_SEARCH_ID_ERROR, payload: error });
    }
  };
};

const getTickets = (searchId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SEARCH_DATA_REQUEST });
    try {
      const res = await fetch(`${apiBase}${tickets}${searchId}`);
      const data = await res.json();

      dispatch({ type: FETCH_SEARCH_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_SEARCH_DATA_ERROR, payload: error });
    }
  };
};

export const debouncedGetTickets = debounce((searchId, dispatch) => {
  getTickets(searchId)(dispatch);
}, 300);

export const getNextTickets = () => ({
  type: GET_NEXT_FIVE_TICKETS,
});

export const actionTypes = [
  TOGGLE_CHECKBOX,
  TOGGLE_PRICE_BTN,
  FETCH_SEARCH_ID_SUCCESS,
  FETCH_SEARCH_ID_ERROR,
  FETCH_SEARCH_DATA_REQUEST,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_ERROR,
  GET_NEXT_FIVE_TICKETS,
];
