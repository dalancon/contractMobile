import { createSelector } from 'reselect';

/**
 * Direct selector to the contractDetails state domain
 */
const selectContractDetailsDomain = () => (state) => state.get('contractDetails');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ContractDetails
 */

const makeSelectContractDetails = () => createSelector(
  selectContractDetailsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectContractDetails;
export {
  selectContractDetailsDomain,
};
