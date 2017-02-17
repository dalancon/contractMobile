import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = () => state => state.get('mainPage')


/**
 * Other specific selectors
 */


/**
 * Default selector used by MainPage
 */

const selectMainPage = () => createSelector(
  selectMainPageDomain(),
  (substate) => substate.toJS()
);

export default selectMainPage;
export {
  selectMainPageDomain,
};
