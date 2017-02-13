import { createSelector } from 'reselect';

/**
 * Direct selector to the examinePayment state domain
 */
const selectExaminePaymentDomain = () => (state) => state.get('examinePayment');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ExaminePayment
 */

const makeSelectExaminePayment = () => createSelector(
  selectExaminePaymentDomain(),
  (substate) => substate.toJS()
);

export default makeSelectExaminePayment;
export {
  selectExaminePaymentDomain,
};
