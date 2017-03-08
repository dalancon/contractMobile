import { createSelector } from 'reselect';

/**
 * Direct selector to the historyTask state domain
 */
const selectHistoryTaskDomain = () => state => state.get('historyTask')


/**
 * Other specific selectors
 */


/**
 * Default selector used by HistoryTask
 */

const selectHistoryTask = () => createSelector(
  selectHistoryTaskDomain(),
  (substate) => substate.toJS()
);

export default selectHistoryTask;
export {
  selectHistoryTaskDomain,
};
