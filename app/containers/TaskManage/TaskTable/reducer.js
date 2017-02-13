/*
 *
 * TaskManage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SHOWFLOWDIAGRAM_ACTION,
  SHOWREPORTFORM_ACTION,
  HIDEFLOWDIAGRAM_ACTION,
  HIDEREPORTFORM_ACTION,
  HIDEMASK_ACTION,
  SHOWMASK_ACTION,
} from './constants';

const initialState = fromJS({
  query: {},
  search: '',
  opinions: [],
  activeTask: {
    processInstanceId: '',
    processDefinitionId: '',
    reportType: '',
    businessId: '',
    showFlowDiagram: false,
    showReportForm: false,
  },
  mask: false, // 是否显示mask
});

function taskTableReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOWFLOWDIAGRAM_ACTION:
      return state.setIn(['activeTask', 'processInstanceId'], action.processInstanceId)
                  .setIn(['activeTask', 'processDefinitionId'], action.processDefinitionId)
                  .setIn(['activeTask', 'showFlowDiagram'], true);
    case HIDEFLOWDIAGRAM_ACTION:
      return state.setIn(['activeTask', 'showFlowDiagram'], false);
    case SHOWREPORTFORM_ACTION:
      return state.setIn(['activeTask', 'businessId'], action.businessId)
                  .setIn(['activeTask', 'processDefinitionId'], action.processDefinitionId)
                  .setIn(['activeTask', 'reportType'], action.reportType)
                  .setIn(['activeTask', 'showReportForm'], true);
    case HIDEREPORTFORM_ACTION:
      return state.setIn(['activeTask', 'showReportForm'], false);
    case SHOWMASK_ACTION:
      return state.set('mask', true);
    case HIDEMASK_ACTION:
      return state.set('mask', false);
    default:
      return state;
  }
}

export default taskTableReducer;
