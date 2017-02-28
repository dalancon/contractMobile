import { createSelector } from 'reselect';

/**
 * Direct selector to the concern state domain
 */
const selectConcernDomain = () => state => state.get('concern')


/**
 * Other specific selectors
 */


/**
 * Default selector used by Concern
 */

const selectConcern = () => createSelector(
  selectConcernDomain(),
  (substate) => substate.toJS()
);

export default selectConcern;
export {
  selectConcernDomain,
};
