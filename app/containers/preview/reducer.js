/*
 *
 * Preview reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETPREVIEW_ACTION,
  SETSOURCE_ACTION,
} from './constants';

const initialState = fromJS({
  preview:'',
  source:'',
});

function PreviewReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SETPREVIEW_ACTION:
      return state.set('preview', action.preview);
    case SETSOURCE_ACTION:
      return state.set('source', action.source);
    default:
      return state;
  }
}

export default PreviewReducer;