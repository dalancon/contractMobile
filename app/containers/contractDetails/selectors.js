import { createSelector } from 'reselect';

/**
 * Direct selector to the contractDetails state domain
 */
const selectContractDetailsDomain = () => state => state.get('contractDetails')


/**
 * Other specific selectors
 */


/**
 * Default selector used by ContractDetails
 */

const selectContractDetails = () => createSelector(
  selectContractDetailsDomain(),
  (substate) => substate.toJS()
);

export default selectContractDetails;
export {
  selectContractDetailsDomain,
};
