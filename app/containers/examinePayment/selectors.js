import { createSelector } from 'reselect';

/**
 * Direct selector to the examineContarc state domain
 */
const selectExaminePaymentDomain = () => state => state.get('examinePayment')


/**
 * Other specific selectors
 */


/**
 * Default selector used by ExaminePayment
 */

const selectExaminePayment = () => createSelector(
  selectExaminePaymentDomain(),
  (substate) => substate.toJS()
);

export default selectExaminePayment;
export {
  selectExaminePaymentDomain,
};
