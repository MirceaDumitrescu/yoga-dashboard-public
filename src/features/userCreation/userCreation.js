import PropTypes from 'prop-types';
import { addDoc } from 'firebase/firestore';
import { errorToast } from '../../components/toasts/errorToasts';
import { succesToast } from '../../components/toasts/successToasts';
import updateDBQuery from '../../components/updateDB/updateDB';
import updateTrainerLogs from '../../components/newMemberModal/updateTrainerLogs';
import updateLogs from '../../features/logUpdater';
import logInterface from '../interfaces/logInterface';
import userInterface from '../interfaces/userInterface';
import financialInterface from '../interfaces/financialInterface';

/**
 *
 * Function creates a new member from modal.
 * This only gets called after validation checks were taken
 * @called from {src/components/add-member-modal.js}
 *
 * @param {reduxState} - the state object containing all the collections
 * @param {userInformation} - the user information
 *
 *
 *
 */

const createUser = async (userInformation, reduxState, dispatch) => {
  const userInterf = userInterface(userInformation);
  const logInterf = logInterface(userInformation, reduxState, 'Create');
  const financeInterf = financialInterface(userInformation, 'Create');

  if (typeof Number(userInformation.moneySpent) === 'number') {
    try {
      /**
       *
       *  Creates a user based on the interface above
       *  @requires: {userInterf} - the interface above
       *  @requires: finances & new_members to be NUMBERS
       *
       */

      // Adds the user to the database
      await addDoc(reduxState.usersCollectionRef, userInterf);

      // Adds the cost to the monthly finances logs database
      await addDoc(reduxState.financeCollectionRef, financeInterf);

      await updateTrainerLogs(reduxState, userInformation, 'Create', dispatch);
      await updateLogs(reduxState, logInterf);
      succesToast('User created successfully');
      await updateDBQuery(dispatch);
    } catch (err) {
      console.error(err.message);
      console.error('Error 1406 creating user');
      errorToast('Error creating user');
    }
  } else {
    console.error('Error 1511: User not created');
    errorToast('Error 1511: User not created');
    errorToast('Error creating user');
  }
};

createUser.propTypes = {
  reduxState: PropTypes.object.isRequired,
  userInformation: PropTypes.object.isRequired
};

export default createUser;
