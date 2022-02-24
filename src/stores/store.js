
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import dateReducer from './reducers/dateReducer';
// import adminReducer from './reducers/adminReducer';
import userReducer from './reducers/userReducer';

// const reducers = combineReducers({ birds: birdsReducer, user:userReducer });
const reducers = combineReducers({  user:userReducer, date:dateReducer });
// const reducers = combineReducers({  user:userReducer, admin:adminReducer });
const store = createStore(reducers, applyMiddleware(thunk));

export default store;