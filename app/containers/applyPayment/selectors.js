import { createSelector } from 'reselect';

/**
 * Direct selector to the examineContarc state domain
 */
const selectApplyPaymentDomain = () => state => state.get('applyPayment')


/**
 * Other specific selectors
 */


/**
 * Default selector used by ApplyPayment
 */

const selectApplyPayment = () => createSelector(
  selectApplyPaymentDomain(),
  (substate) => substate.toJS()
);

export default selectApplyPayment;
export {
  selectApplyPaymentDomain,
};
