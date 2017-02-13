import { createSelector } from 'reselect';

/**
 * Direct selector to the applyPayment state domain
 */
const selectPaymentDetailsDomain = () => (state) => state.get('paymentDetails');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PaymentDetails
 */

const makeSelectPaymentDetails = () => createSelector(
  selectPaymentDetailsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPaymentDetails;
export {
  selectPaymentDetailsDomain,
};
