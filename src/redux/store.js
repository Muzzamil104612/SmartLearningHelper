import {createStore, combineReducers} from 'redux';
import itemReducer from './reducer';


const rootReducer = combineReducers({
  value: itemReducer,
 
 
});

const store = createStore(rootReducer);

export default store;