import { createSelector } from 'reselect';

/**
 * Direct selector to the todoTask state domain
 */
const selectTodoTaskDomain = () => state => state.get('todoTask')


/**
 * Other specific selectors
 */


/**
 * Default selector used by TodoTask
 */

const selectTodoTask = () => createSelector(
  selectTodoTaskDomain(),
  (substate) => substate.toJS()
);

export default selectTodoTask;
export {
  selectTodoTaskDomain,
};
