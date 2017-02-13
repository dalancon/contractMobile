import { createSelector } from 'reselect';

/**
 * Direct selector to the taskManage state domain
 */
const selectTaskManageDomain = () => (state) => state.get('taskManage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TaskManage
 */

const makeSelectTaskManage = () => createSelector(
  selectTaskManageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTaskManage;
export {
  selectTaskManageDomain,
};
