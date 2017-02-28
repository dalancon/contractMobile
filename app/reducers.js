import { combineReducers } from 'redux-immutable';
import LoginReducer from './containers/login/reducer';
import MainReducer from './containers/main/reducer';
import TodoPageReducer from './containers/todo/reducer';
import ExaminePaymentReducer from './containers/examinePayment/reducer';
import ViewContractReducer from './containers/viewContract/reducer';
import ContractDetailsReducer from './containers/contractDetails/reducer';
import ConcernReducer from './containers/concern/reducer';
import MyReducer from './containers/my/reducer';

export default combineReducers({
	loginPage: LoginReducer,
	mainPage: MainReducer,
	todoPage: TodoPageReducer,
	examinePayment: ExaminePaymentReducer,		//审批支付单页面
	viewContract: ViewContractReducer,
	contractDetails: ContractDetailsReducer,
	concern: ConcernReducer,
	my: MyReducer,
});
