import { createSelector } from 'reselect';

/**
 * Direct selector to the applyPayment state domain
 */
const selectApplyPaymentDomain = () => (state) => state.get('applyPayment');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ApplyPayment
 */

const makeSelectApplyPayment = () => createSelector(
  selectApplyPaymentDomain(),
  (substate) => substate.toJS()
);

export default makeSelectApplyPayment;
export {
  selectApplyPaymentDomain,
};
