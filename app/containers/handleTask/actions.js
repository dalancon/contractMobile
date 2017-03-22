import {
  DEFAULT_ACTION,
  FETCHOPINIONS_ACTION,
  FETCHOUTGOING_ACTION,
  SETOPINIONS_ACTION,
  SETOUTGOING_ACTION,
  SETFORM_ACTION,
  SETCOMPLETE_ACTION,
  SETRESULT_ACTION,
  HANDLETASK_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  }
}

export function fetchOutgoing(businessId, taskId, activityId, processInstanceId, processDefinitionId) {
  return {
    type: FETCHOUTGOING_ACTION,
    businessId,
    taskId,
    activityId,
    processInstanceId,
    processDefinitionId,
  }
}

export function setOutgoing(outgoing) {
  return {
    type: SETOUTGOING_ACTION,
    outgoing,
  };
}

// 获取意见
export function fetchOpinions() {
  return {
    type: FETCHOPINIONS_ACTION,
  };
}

export function setOpinions(opinions) {
  return {
    type: SETOPINIONS_ACTION,
    opinions,
  };
}

//设置表单
export function setForm(form) {
  return {
    type: SETFORM_ACTION,
    form,
  }
}

//处理流程
export function handleTask(form) {
  return {
    type: HANDLETASK_ACTION,
    form,
  }
}

//设置流程结果
export function setComplete(complete) {
  return {
    type: SETCOMPLETE_ACTION,
    complete,
  }
}

export function setResult(result) {
  return {
    type: SETRESULT_ACTION,
    result,
  }
}



