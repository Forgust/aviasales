import { combineReducers, createStore } from 'redux';
import checkboxReducer from './reducer';

const rootReducer = combineReducers({
  checkboxReducer,
});

const store = createStore(rootReducer);

export default store;
