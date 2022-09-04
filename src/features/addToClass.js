import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../components/api/firebase';
import updateDBQuery from '../components/updateDB/updateDB';
import updateLogs from './logUpdater';
import { succesToast } from '../components/toasts/successToasts';
import { errorToast } from '../components/toasts/errorToasts';
import logInterface from './interfaces/logInterface';
import updateTrainerLogs from '../components/newMemberModal/updateTrainerLogs';
import PropTypes from 'prop-types';

const addToClassModule = async (userInformation, reduxState, dispatch) => {
  const userDoc = doc(db, 'users', userInformation.userId);
  const logInterf = logInterface(userInformation, reduxState, 'Participate');
  /**
   * EntriesArray represents the array of entries that the user has made
   * which are shown in the user modal. Limited to last 9 maximum entries
   */
  const userEntries = {
    ...userInformation.entries,
    today: {
      date: userInformation.AddToClassDate,
      trainer: reduxState.loggedInTrainer.email,
      sessions: userInformation.sessions
    }
  };

  const getParticipantsByDate = (date) => {
    return reduxState.classes
      .filter((class_) => class_.id === date)
      .map((class_) => class_.participants)
      .flat();
  };

  const existingParticipants = getParticipantsByDate(userInformation.AddToClassDate);

  /**
   * If the client has already been added to the class,
   * returns true otherwise false
   * @returns {boolean}
   */
  if ([...existingParticipants].includes(userInformation.userId)) {
    errorToast('User is already in this class');
  } else {
    try {
      /**
       * updates individual user-collection
       * entries array which is a logging array
       * for all class entries made by the user
       */
      await updateDoc(userDoc, {
        entries: userEntries,
        last_entry: userInformation.AddToClassDate,
        current_sessions: userInformation.sessions > 0 ? Number(userInformation.sessions) - 1 : 0,
        active: userInformation.sessions > 1
      });

      /**
       * creates/updates a doc in the classes collection
       * by adding the user to the class
       */
      await setDoc(doc(db, 'classes', userInformation.AddToClassDate), {
        participants: [...existingParticipants, userInformation.userId],
        trainer: reduxState.loggedInTrainer.email,
        date: userInformation.AddToClassDate,
        hours: '18:30 - 20:00',
        cancelations: 0,
        reservations: 0
      });

      /**
       * updates the trainer-participants collection
       * by adding 1 to the counter of total participants
       */
      updateTrainerLogs(reduxState, userInformation, 'Participate', dispatch);
      succesToast('User added to class');
      updateLogs(reduxState, logInterf);
      updateDBQuery(dispatch);
    } catch (error) {
      console.error(error.message);
      console.error('Error 1635 occured');
    }
  }
};

addToClassModule.propTypes = {
  userInformation: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default addToClassModule;
