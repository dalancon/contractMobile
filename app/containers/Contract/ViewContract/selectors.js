import { createSelector } from 'reselect';

/**
 * Direct selector to the viewContract state domain
 */
const selectViewContractDomain = () => (state) => state.get('viewContract');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ViewContract
 */

const makeSelectViewContract = () => createSelector(
  selectViewContractDomain(),
  (substate) => substate.toJS()
);

export default makeSelectViewContract;
export {
  selectViewContractDomain,
};
