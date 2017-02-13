/*
 *
 * ViewContract actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHCONTRACTINFO_ACTION,
  FETCHPOITEM_ACTION,
  FETCHPAIDHISTORY_ACTION,
  SETCONTRACTINFO_ACTION,
  SETPOITEM_ACTION,
  SETPAIDHISTORY_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchContractInfo(systemCode, poNo) {
  return {
    type: FETCHCONTRACTINFO_ACTION,
    systemCode, 
    poNo,
  }
}

export function fetchPoItem(systemCode, poNo) {
  return {
    type: FETCHPOITEM_ACTION,
    systemCode, 
    poNo,
  }
}

export function fetchPaidHistory(systemId, systemCode, poNo) {
  return {
    type: FETCHPAIDHISTORY_ACTION,
    systemId,
    systemCode, 
    poNo,
  }
}

export function setContractInfo(info) {
  return {
    type: SETCONTRACTINFO_ACTION,
    info,
  }
}

export function setPoItem(poItem) {
  return {
    type: SETPOITEM_ACTION,
    poItem,
  }
}

export function setPaidHistory(history) {
  return {
    type: SETPAIDHISTORY_ACTION,
    history,
  }
}