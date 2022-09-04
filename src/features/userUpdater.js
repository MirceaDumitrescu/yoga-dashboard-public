import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/api/firebase';
import updateDBQuery from '../components/updateDB/updateDB';
import updateLogs from './logUpdater';
import { succesToast } from '../components/toasts/successToasts';
import { errorToast } from '../components/toasts/errorToasts';
import PropTypes from 'prop-types';
import userRenewalHandler from './userRenewalHandler';
import logInterface from './interfaces/logInterface';
import { today } from '../utils/constants';
import moment from 'moment';

/**
 *
 *
 * Function updates the user's data in the database and in the redux state
 *
 * @param {*} editableUser - the user that is being edited
 * @param {*} userInformation - the information that is being updated
 * @param {*} setPartialUserInformation - the function that sets the user information
 * @param {*} reduxState - the redux state
 * @param {*} dispatch - the redux dispatch
 * @returns
 */

const userUpdate = async (
  editableUser,
  userInformation,
  setPartialUserInformation,
  reduxState,
  dispatch,
  expirationDate
) => {
  const userDoc = doc(db, 'users', userInformation.userId);
  const log = logInterface(userInformation, reduxState, 'Update');
  /**
   *
   * @interface in database
   *  date {
   *  moneySpent: userInformation.moneySpent,
   *  sessions: userInformation.sessions
   *  }
   *
   *
   */
  const getRenewals = () => {
    if (userInformation.moneySpent > 0 || userInformation.startingDate !== '') {
      return {
        ...editableUser.new_renewals,
        [userInformation.startingDate !== '' ? userInformation.startingDate : today]: {
          moneySpent: userInformation.moneySpent,
          sessions: userInformation.sessions
        }
      };
    } else {
      return {};
    }
  };

  const renewals = getRenewals();

  if (
    userInformation.sessions > editableUser.current_sessions &&
    userInformation.moneySpent === 0
  ) {
    errorToast('You must add cost');
    setPartialUserInformation({ MembershipError: true });
    return;
  } else {
    try {
      await updateDoc(userDoc, {
        firstname: userInformation.firstname,
        lastname: userInformation.lastname,
        email: userInformation.email,
        phone: userInformation.phone,
        starting_date:
          userInformation.startingDate !== ''
            ? userInformation.startingDate
            : editableUser.starting_date,
        expiration_date: userInformation.expiration_date
          ? userInformation.expiration_date
          : moment(userInformation.startingDate).add(30, 'd').format('YYYY Do MMMM'),

        current_sessions: Number(userInformation.sessions),
        active: editableUser.current_sessions > 0 || userInformation.sessions > 0,
        money_spent:
          userInformation.moneySpent > 0
            ? userInformation.moneySpent + editableUser.money_spent
            : editableUser.money_spent,
        observation: userInformation.observation,
        new_renewals: renewals,
        uuid: userInformation.uuid
      });
      succesToast('User updated successfully');
      await updateLogs(reduxState, log);
      setPartialUserInformation({ MembershipError: false });
    } catch (error) {
      console.error(error.message);
      console.error('Updating the user Failed. Code 1454 Error. Report to the admins.');
      errorToast('Error updating user');
    } finally {
      await userRenewalHandler(
        userInformation,
        editableUser,
        db,
        reduxState,
        dispatch,
        expirationDate
      );
    }
  }
  await updateDBQuery(dispatch);
};

userUpdate.propTypes = {
  editableUser: PropTypes.object.isRequired,
  userInformation: PropTypes.object.isRequired,
  setPartialUserInformation: PropTypes.func.isRequired,
  reduxState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default userUpdate;
