import { setDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import updateDBQuery from '../components/updateDB/updateDB';
import PropTypes from 'prop-types';
import { thisMonthString, today, currentYear } from '../utils/constants';
import renewalInterface from './interfaces/renewalInterface';
import financialInterface from './interfaces/financialInterface';

/**
 *
 * Function to update the studio's financial data
 *
 *
 * @param {*} userInformation - the information that is being updated
 * @param {*} editableUser - the user that is being edited
 * @param {*} db - the firebase database
 * @param {*} reduxState - the redux state
 * @param {*} dispatch - the redux dispatch
 * @param {*} expirationDate - the expiration date
 */
const userRenewalHandler = async (
  userInformation,
  editableUser,
  db,
  reduxState,
  dispatch,
  expirationDate
) => {
  if (
    userInformation.sessions !== editableUser.current_sessions ||
    userInformation.moneySpent !== editableUser.current_moneySpent ||
    userInformation.startingDate !== editableUser.current_startingDate
  ) {
    const renewalInterf = renewalInterface(
      userInformation,
      reduxState.loggedInTrainer.email,
      expirationDate
    );

    const financeInterf = financialInterface(userInformation, 'Create');
    const renewalDate = `${thisMonthString} - ${currentYear}`;
    const renewalDoc = doc(db, 'renewals', renewalDate);
    /**
     *
     * Updates the total income for the current month
     * based on the cost the trainer added to the user
     */
    try {
      // Adds the cost to the monthly finances logs database
      await addDoc(reduxState.financeCollectionRef, financeInterf);
    } catch (error) {
      console.error(error.message);
      alert('Error updating financial data');
    }
    /**
     *
     * Adds 1 to the total renewals for the current month
     * if the user has renewed his total number of sessions
     *
     */
    const currentMonthRenewals = reduxState.renewalState.filter(
      (renewal) => renewal.id === renewalDate
    );

    const getRenewals = (array) => {
      const renewals = [];
      array.forEach((renewal) => {
        for (const value of Object.entries(renewal)) {
          if (typeof value === 'object') {
            renewals.push(...value);
          }
        }
      });
      return renewals;
    };

    const existingRenewals = getRenewals(currentMonthRenewals);

    if (currentMonthRenewals.length === 0) {
      await setDoc(doc(db, 'renewals', renewalDate), {
        [today]: [renewalInterf]
      });
    } else {
      try {
        await updateDoc(renewalDoc, {
          [today]: [...existingRenewals, renewalInterf]
        });
      } catch (error) {
        console.error(error.message);
        console.error('Error 1742 occured');
        alert('Error updating renewal data');
      }
    }
  }
  await updateDBQuery(dispatch);
};

userRenewalHandler.propTypes = {
  userInformation: PropTypes.object.isRequired,
  editableUser: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default userRenewalHandler;
