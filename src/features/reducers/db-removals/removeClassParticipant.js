import { db } from '../../../components/api/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import updateDBQuery from '../../../components/updateDB/updateDB';
import { errorToast } from '../../../components/toasts/errorToasts';
import { succesToast } from '../../../components/toasts/successToasts';
import updateLogs from '../../logUpdater';
import PropTypes from 'prop-types';
import logInterface from '../../interfaces/logInterface';

const handleUserRemoval = async (reduxState, userUUID, userId, dateId, dispatch) => {
  /**
   * Searches the trainers collection for the entry with the same clientID
   * and firstly, removes that entry from trainer logs to adjust the correct
   * number of participants for the trainer.
   *
   */
  const logToRemove = reduxState.trainerData.filter((trainerLog) => {
    if (
      trainerLog.clientId === userUUID &&
      trainerLog.type === 'Participate' &&
      trainerLog.dateOfParticipant === dateId
    ) {
      return trainerLog;
    }
    return 'No log found';
  });

  const trainerRef = doc(db, 'trainers', logToRemove[0].id);
  const classRef = doc(db, 'classes', dateId);
  const userInformation = reduxState.users.find((user) => user.uuid === userUUID);
  const log = logInterface(userInformation, reduxState, 'Remove');

  // return the class the matches the date sent in the parameter
  const classToRemove = reduxState.classes.find((classItem) => classItem.id === dateId);

  // returns the class without the user that was removed
  const newClass = classToRemove.participants.filter((user) => user !== userId);

  const removeParticipantFromClass = async () => {
    try {
      await deleteDoc(trainerRef);
      await updateDoc(classRef, { participants: [...newClass] });
      await updateLogs(reduxState, log);
    } catch (error) {
      console.error(error);
      console.error('Error 1429 ocurred');
    }
    /**
     *
     * If the class has no participants, the class is deleted from the database
     *
     */
    if (newClass.length === 0) {
      try {
        await deleteDoc(classRef);
        succesToast('Class deleted');
      } catch (error) {
        console.error(error);
        console.error('Error 1430 occured');
      }
    }
    await updateDBQuery(dispatch);
    succesToast('User removed');
  };

  classToRemove ? await removeParticipantFromClass() : errorToast('Log not found');
};

handleUserRemoval.propTypes = {
  reduxState: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  dateId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  userInformation: PropTypes.object.isRequired
};

export default handleUserRemoval;
