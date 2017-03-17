import { createSelector } from 'reselect';

/**
 * Direct selector to the Preview state domain
 */
const selectPreviewDomain = () => state => state.get('preview')


/**
 * Other specific selectors
 */


/**
 * Default selector used by Preview
 */

const selectPreview = () => createSelector(
  selectPreviewDomain(),
  (substate) => substate.toJS()
);

export default selectPreview;
export {
  selectPreviewDomain,
};
