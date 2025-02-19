/*eslint-disable */
const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';

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

export const getTickets = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SEARCH_DATA_REQUEST });
    try {
      const resId = await fetch(`${apiBase}${search}`);
      const dataId = await resId.json();
      const searchId = await dataId.searchId;

      const res = await fetch(`${apiBase}${tickets}${searchId}`);
      const data = await res.json();

      dispatch({ type: FETCH_SEARCH_DATA_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_SEARCH_DATA_ERROR, payload: error });
    }
  };
};

export const getNextTickets = () => ({
  type: GET_NEXT_FIVE_TICKETS,
});

export const actionTypes = [
  TOGGLE_CHECKBOX,
  FETCH_SEARCH_DATA_REQUEST,
  FETCH_SEARCH_DATA_SUCCESS,
  FETCH_SEARCH_DATA_ERROR,
  GET_NEXT_FIVE_TICKETS,
];

/*eslint-enable */
