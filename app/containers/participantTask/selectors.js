import { createSelector } from 'reselect';

/**
 * Direct selector to the participantTask state domain
 */
const selectParticipantTaskDomain = () => state => state.get('participantTask')


/**
 * Other specific selectors
 */


/**
 * Default selector used by ParticipantTask
 */

const selectParticipantTask = () => createSelector(
  selectParticipantTaskDomain(),
  (substate) => substate.toJS()
);

export default selectParticipantTask;
export {
  selectParticipantTaskDomain,
};
