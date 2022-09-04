import { db } from '../../../components/api/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import updateDBQuery from '../../../components/updateDB/updateDB';
import { errorToast } from '../../../components/toasts/errorToasts';
import { succesToast } from '../../../components/toasts/successToasts';
import PropTypes from 'prop-types';
import updateLogs from '../../logUpdater';
import logInterface from '../../interfaces/logInterface';

/**
 *
 * Function removes a user completely from the database
 *
 * @param {*} id the id of the user to be removed
 * @param {*} setShowDeleteModal shows the confirmation modal
 * @param {*} dispatch
 * @param {*} stateObject the state object containing all the collections
 * @param {*} userInformation the user information
 */
const deleteUser = async (id, setShowDeleteModal, dispatch, userInformation, reduxState) => {
  const log = logInterface(userInformation, reduxState, 'Delete');

  const userDoc = doc(db, 'users', id);
  try {
    await deleteDoc(userDoc);
    succesToast('User deleted');
    setShowDeleteModal(false);
    await updateDBQuery(dispatch);
    await updateLogs(reduxState, log);
  } catch (error) {
    console.error(error);
    console.error('Error 1326 - Error deleting user');
    errorToast('Error deleting user');
  }
};

deleteUser.propTypes = {
  id: PropTypes.string.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userInformation: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired
};

export default deleteUser;
