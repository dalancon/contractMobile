import { createSelector } from 'reselect';

/**
 * Direct selector to the my state domain
 */
const selectMyDomain = () => state => state.get('my')


/**
 * Other specific selectors
 */


/**
 * Default selector used by My
 */

const selectMy = () => createSelector(
  selectMyDomain(),
  (substate) => substate.toJS()
);

export default selectMy;
export {
  selectMyDomain,
};
