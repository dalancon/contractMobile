/*
 *
 * TaskManage actions
 *
 */

import {
  DEFAULT_ACTION,
  SHOWFLOWDIAGRAM_ACTION,
  SHOWREPORTFORM_ACTION,
  HIDEFLOWDIAGRAM_ACTION,
  HIDEREPORTFORM_ACTION,
  SHOWMASK_ACTION,
  HIDEMASK_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showFlowDiagram(processInstanceId, processDefinitionId) {
  return {
    type: SHOWFLOWDIAGRAM_ACTION,
    processInstanceId,
    processDefinitionId,
  };
}

export function hideFlowDiagram() {
  return {
    type: HIDEFLOWDIAGRAM_ACTION,
  };
}

export function showReportForm(businessId, processDefinitionId, reportType) {
  return {
    type: SHOWREPORTFORM_ACTION,
    businessId,
    processDefinitionId,
    reportType,
  };
}

export function hideReportForm() {
  return {
    type: HIDEREPORTFORM_ACTION,
  };
}

export function showMask() {
  return {
    type: SHOWMASK_ACTION,
  };
}

export function hideMask() {
  return {
    type: HIDEMASK_ACTION,
  };
}

