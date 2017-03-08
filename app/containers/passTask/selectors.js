import { createSelector } from 'reselect';

/**
 * Direct selector to the passTask state domain
 */
const selectPassTaskDomain = () => state => state.get('passTask')


/**
 * Other specific selectors
 */


/**
 * Default selector used by PassTask
 */

const selectPassTask = () => createSelector(
  selectPassTaskDomain(),
  (substate) => substate.toJS()
);

export default selectPassTask;
export {
  selectPassTaskDomain,
};
