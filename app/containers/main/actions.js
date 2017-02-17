import {
  SETTAB_ACTION,
} from './constants';


export function setTab(current) {
  return {
    type: SETTAB_ACTION,
    current,
  };
}
