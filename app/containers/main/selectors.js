import { createSelector } from 'reselect';


/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = () => state => state.get('mainPage');
const selectLoginPageDomain = () => state => state.get('loginPage');


/**
 * Other specific selectors
 */


/**
 * Default selector used by MainPage
 */

const selectMainPage = () => createSelector(
  selectMainPageDomain(),
  selectLoginPageDomain(),
  (substate, loginState) => Object.assign({}, substate.toJS(), loginState.toJS())
);

export default selectMainPage;
export {
  selectMainPageDomain,
};
