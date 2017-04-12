import { createSelector } from 'reselect';

/**
 * Direct selector to the PreviewDoc state domain
 */
const selectPreviewDocDomain = () => state => state.get('previewDoc')


/**
 * Other specific selectors
 */


/**
 * Default selector used by Preview
 */

const selectPreviewDoc = () => createSelector(
  selectPreviewDocDomain(),
  (substate) => substate.toJS()
);

export default selectPreviewDoc;
export {
  selectPreviewDocDomain,
};
