import { combineReducers } from 'redux';
import isUserLoggedIn from './isUserLoggedIn';
import getAllVacations from './getAllVacations';

const combinedReducers = combineReducers({
    isUserLoggedIn,
    getAllVacations
});

export default combinedReducers;