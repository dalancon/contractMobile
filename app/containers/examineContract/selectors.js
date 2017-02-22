import { createSelector } from 'reselect';

/**
 * Direct selector to the examineContarc state domain
 */
const selectExamineContractDomain = () => state => state.get('examineContract')


/**
 * Other specific selectors
 */


/**
 * Default selector used by ExamineContract
 */

const selectExamineContract = () => createSelector(
  selectExamineContractDomain(),
  (substate) => substate.toJS()
);

export default selectExamineContract;
export {
  selectExamineContractDomain,
};
