import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../features/Auth/authSlice';
import { bookingReducer } from '../features/Booking/bookingSlice';
import { adminReducer } from '../features/Admin/adminSlice';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  booking: bookingReducer,
    auth: authReducer,
    admin: adminReducer
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;