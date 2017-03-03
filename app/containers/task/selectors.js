import { createSelector } from 'reselect';

/**
 * Direct selector to the task state domain
 */
const selectTaskDomain = () => state => state.get('task')


/**
 * Other specific selectors
 */


/**
 * Default selector used by Task
 */

const selectTask = () => createSelector(
  selectTaskDomain(),
  (substate) => substate.toJS()
);

export default selectTask;
export {
  selectTaskDomain,
};
