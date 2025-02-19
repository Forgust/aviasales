import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { checkboxReducer, aviaApiReducer } from './reducer';

const rootReducer = combineReducers({
  checkboxReducer,
  aviaApiReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
