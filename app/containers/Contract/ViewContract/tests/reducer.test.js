
import { fromJS } from 'immutable';
import viewContractReducer from '../reducer';

describe('viewContractReducer', () => {
  it('returns the initial state', () => {
    expect(viewContractReducer(undefined, {})).toEqual(fromJS({}));
  });
});
