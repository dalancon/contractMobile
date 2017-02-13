import { createSelector } from 'reselect';

/**
 * Direct selector to the editPayment state domain
 */
const selectEditPaymentDomain = () => (state) => state.get('editPayment');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditPayment
 */

const makeSelectEditPayment = () => createSelector(
  selectEditPaymentDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditPayment;
export {
  selectEditPaymentDomain,
};
