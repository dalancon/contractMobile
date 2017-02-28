import { createSelector } from 'reselect';

/**
 * Direct selector to the viewContract state domain
 */
const selectViewContractDomain = () => state => state.get('viewContract')


/**
 * Other specific selectors
 */


/**
 * Default selector used by ViewContract
 */

const selectViewContract = () => createSelector(
  selectViewContractDomain(),
  (substate) => substate.toJS()
);

export default selectViewContract;
export {
  selectViewContractDomain,
};
