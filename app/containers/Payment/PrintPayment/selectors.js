import { createSelector } from 'reselect';

/**
 * Direct selector to the printPayment state domain
 */
const selectPrintPaymentDomain = () => (state) => state.get('printPayment');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PrintPayment
 */

const makeSelectPrintPayment = () => createSelector(
  selectPrintPaymentDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPrintPayment;
export {
  selectPrintPaymentDomain,
};
