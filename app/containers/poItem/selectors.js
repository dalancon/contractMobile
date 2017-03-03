import { createSelector } from 'reselect';

/**
 * Direct selector to the poItem state domain
 */
const selectPoItemDomain = () => state => state.get('poItem')


/**
 * Other specific selectors
 */


/**
 * Default selector used by PoItem
 */

const selectPoItem = () => createSelector(
  selectPoItemDomain(),
  (substate) => substate.toJS()
);

export default selectPoItem;
export {
  selectPoItemDomain,
};
