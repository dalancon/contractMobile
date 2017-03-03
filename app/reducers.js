import { combineReducers } from 'redux-immutable';
import LoginReducer from './containers/login/reducer';
import MainReducer from './containers/main/reducer';
import TodoPageReducer from './containers/todo/reducer';
import ExaminePaymentReducer from './containers/examinePayment/reducer';
import ApplyPaymentReducer from './containers/applyPayment/reducer';
import ViewContractReducer from './containers/viewContract/reducer';
import ContractDetailsReducer from './containers/contractDetails/reducer';
import TaskReducer from './containers/task/reducer';
import MyReducer from './containers/my/reducer';
import HandleTaskReducer from './containers/handleTask/reducer';
import PoItemReducer from './containers/poItem/reducer';

export default combineReducers({
	loginPage: LoginReducer,
	mainPage: MainReducer,
	todoPage: TodoPageReducer,
	examinePayment: ExaminePaymentReducer,		//审批支付单页面
	applyPayment: ApplyPaymentReducer,		//申请支付单页面
	viewContract: ViewContractReducer,
	contractDetails: ContractDetailsReducer,
	task: TaskReducer,
	my: MyReducer,
	handleTask: HandleTaskReducer,
	poItem: PoItemReducer,
});
