import { createSelector } from 'reselect';

/**
 * Direct selector to the taskTable state domain
 */
const selectTaskTableDomain = () => (state) => state.get('taskTable');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TaskTable
 */

const makeSelectTaskTable = () => createSelector(
  selectTaskTableDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTaskTable;
export {
  selectTaskTableDomain,
};
