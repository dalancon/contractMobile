/*
 *
 * Task reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETOUTGOING_ACTION,
  SETOPINIONS_ACTION,
  SETFORM_ACTION,
  SETCOMPLETE_ACTION,
  SETRESULT_ACTION,
} from './constants';

const initialState = fromJS({
  outgoing: [],
  opinions: [],
  onSubmit: () => {},
  afterSubmit: () => {},
  complete: false,  // 是否已经提交
  result: null,     // 提交结果
  form: {
    outGoingId: '',
    userId: '',
    participantUsers: '',
    comment:'',
  }
});

function HandleTaskReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SETOUTGOING_ACTION:
      return state.set('outgoing', action.outgoing);
    case SETOPINIONS_ACTION:
      return state.set('opinions', action.opinions);
    case SETFORM_ACTION:
      return state.set('form', state.get('form').merge(action.form));
    case SETCOMPLETE_ACTION:
      return state.set('complete', true);
    case SETRESULT_ACTION:
      return state.set('result', action.result);
    default:
      return state;
  }
}

export default HandleTaskReducer;