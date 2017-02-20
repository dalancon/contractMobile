import { createSelector } from 'reselect';

/**
 * Direct selector to the todoPage state domain
 */
const selectTodoPageDomain = () => state => state.get('todoPage')


/**
 * Other specific selectors
 */


/**
 * Default selector used by TodoPage
 */

const selectTodoPage = () => createSelector(
  selectTodoPageDomain(),
  (substate) => substate.toJS()
);

export default selectTodoPage;
export {
  selectTodoPageDomain,
};
