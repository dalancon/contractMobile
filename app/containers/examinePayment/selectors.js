import { createSelector } from 'reselect';

/**
 * Direct selector to the examineContarc state domain
 */
const selectExaminePaymentDomain = () => state => state.get('examinePayment');
const selectLoginPageDomain = () => state => state.get('loginPage');


/**
 * Other specific selectors
 */


/**
 * Default selector used by ExaminePayment
 */

const selectExaminePayment = () => createSelector(
   selectExaminePaymentDomain(),
   selectLoginPageDomain(),
   (substate, loginState) => Object.assign({}, substate.toJS(), loginState.toJS())
);

export default selectExaminePayment;
export {
  selectExaminePaymentDomain,
};
