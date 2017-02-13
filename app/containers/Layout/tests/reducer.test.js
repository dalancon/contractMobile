
import { fromJS } from 'immutable';
import layoutReducer from '../reducer';

describe('layoutReducer', () => {
  it('returns the initial state', () => {
    expect(layoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
