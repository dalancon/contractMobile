import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => (state) => state.get('loginPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectLoginUsers = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.toJS().users
);

const makeSelectLogining = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.toJS().logining
);

const makeSelectLogin = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.toJS().login
);

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectLoginUsers,
  makeSelectLogining,
  makeSelectLogin,
};
