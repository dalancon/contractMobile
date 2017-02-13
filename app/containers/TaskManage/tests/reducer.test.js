
import { fromJS } from 'immutable';
import taskManageReducer from '../reducer';

describe('taskManageReducer', () => {
  it('returns the initial state', () => {
    expect(taskManageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
