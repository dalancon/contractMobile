import { combineReducers } from 'redux-immutable';
import LoginReducer from './containers/login/reducer';
import MainReducer from './containers/main/reducer';
import TodoPageReducer from './containers/todo/reducer';
import ExamineContractReducer from './containers/examineContract/reducer';

export default combineReducers({
	loginPage: LoginReducer,
	mainPage: MainReducer,
	todoPage: TodoPageReducer,
	examineContract: ExamineContractReducer,
});
