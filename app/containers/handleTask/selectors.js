import { createSelector } from 'reselect';

/**
 * Direct selector to the handleTask state domain
 */
const selectHandleTaskDomain = () => state => state.get('handleTask')


/**
 * Other specific selectors
 */


/**
 * Default selector used by Task
 */

const selectHandleTask = () => createSelector(
  selectHandleTaskDomain(),
  (substate) => substate.toJS()
);

export default selectHandleTask;
export {
  selectHandleTaskDomain,
};
