import { createSelector } from 'reselect';

/**
 * Direct selector to the layout state domain
 */
const selectLayoutDomain = () => (state) => state.get('layout');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Layout
 */

const makeSelectLayout = () => createSelector(
  selectLayoutDomain(),
  (substate) => substate.toJS()
);

const makeSelectToolbarBtns = () => createSelector(
  selectLayoutDomain(),
  (substate) => substate.toJS().toolbarBtns
);

const makeSelectLoginUser = () => createSelector(
  selectLayoutDomain(),
  (substate) => substate.toJS().loginUser
);

const makeSelectMenu = () => createSelector(
  selectLayoutDomain(),
  (substate) => substate.toJS().menu
);

export default makeSelectLayout;
export {
  selectLayoutDomain,
  makeSelectToolbarBtns,
  makeSelectLoginUser,
  makeSelectMenu,
};
