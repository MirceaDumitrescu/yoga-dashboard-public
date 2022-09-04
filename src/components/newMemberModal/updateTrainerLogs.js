import { addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import updateDBQuery from '../updateDB/updateDB';
import trainerInterface from '../../features/interfaces/trainerInterface';

/**
 *
 *
 * @description Function adds entries into the trainer data db
 * @interface {trainerInterface}
 *
 *
 * @param {*} reduxState - the state object containing all the collections
 * @param {*} userInformation the user information
 * @param {*} dispatch - the redux dispatch function
 */
const updateTrainerLogs = async (reduxState, userInformation, action, dispatch) => {
  const trainerInterf = trainerInterface(userInformation, reduxState, action);
  try {
    await addDoc(reduxState.trainerRef, trainerInterf);
    await updateDBQuery(dispatch);
  } catch (error) {
    console.error(error);
    console.error('Error updating trainer income 1524');
  }
};

updateTrainerLogs.propTypes = {
  stateObject: PropTypes.object.isRequired,
  userInformation: PropTypes.object,
  action: PropTypes.string.isRequired,
  dispatch: PropTypes.func
};

export default updateTrainerLogs;
