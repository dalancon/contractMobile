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
} from './constants';

const initialState = fromJS({
  outgoing: [],
  opinions: [],
  onSubmit: () => {},
  afterSubmit: () => {},
  form: {
    outgoingValue: '',
    user: '',
    participantUser: '',
  }
});

function HandleTaskReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETOUTGOING_ACTION:
      return state.set('outgoing', action.outgoing);
    case SETOPINIONS_ACTION:
      return state.set('opinions', action.opinions);
    case SETFORM_ACTION:
      return state.set('form', state.get('form').merge(action.form));
    default:
      return state;
  }
}

export default HandleTaskReducer;