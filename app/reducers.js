import { combineReducers } from 'redux-immutable';
import LoginReducer from './containers/login/reducer';
import MainReducer from './containers/main/reducer';

export default combineReducers({
	loginPage: LoginReducer,
	mainPage: MainReducer,
});
