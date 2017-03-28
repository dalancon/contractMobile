import { combineReducers } from 'redux-immutable';
import LoginReducer from './containers/login/reducer';
import MainReducer from './containers/main/reducer';
import TodoTaskReducer from './containers/todoTask/reducer';
import ParticipantTaskReducer from './containers/participantTask/reducer';
import HistoryTaskReducer from './containers/historyTask/reducer';
import PassTaskReducer from './containers/passTask/reducer';
import ExaminePaymentReducer from './containers/examinePayment/reducer';
import ApplyPaymentReducer from './containers/applyPayment/reducer';
import ViewContractReducer from './containers/viewContract/reducer';
import ContractDetailsReducer from './containers/contractDetails/reducer';
import MyReducer from './containers/my/reducer';
import HandleTaskReducer from './containers/handleTask/reducer';
import PoItemReducer from './containers/poItem/reducer';
import PreviewReducer  from './containers/preview/reducer';

export default combineReducers({
  loginPage: LoginReducer,
  mainPage: MainReducer,
  todoTask: TodoTaskReducer,
  participantTask: ParticipantTaskReducer,
  historyTask: HistoryTaskReducer,
  passTask: PassTaskReducer,
  examinePayment: ExaminePaymentReducer,    //审批支付单页面
  applyPayment: ApplyPaymentReducer,    //申请支付单页面
  viewContract: ViewContractReducer,
  contractDetails: ContractDetailsReducer,
  my: MyReducer,
  handleTask: HandleTaskReducer,
  poItem: PoItemReducer,
  preview: PreviewReducer,
});
