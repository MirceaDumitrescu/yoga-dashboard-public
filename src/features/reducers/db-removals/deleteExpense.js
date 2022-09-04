import { db } from '../../../components/api/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import updateDBQuery from '../../../components/updateDB/updateDB';
import { succesToast } from '../../../components/toasts/successToasts';
import { errorToast } from '../../../components/toasts/errorToasts';
import PropTypes from 'prop-types';

/**
 *
 * Function to delete expense from firebase
 *
 * @param {*} id : id of the expense to be deleted : string
 * @param {*} dispatch : redux dispatch function
 */
const deleteExpense = async (id, dispatch) => {
  const dbExpenses = doc(db, 'expenses', id);
  try {
    await deleteDoc(dbExpenses);
    succesToast('Expense deleted');
    await updateDBQuery(dispatch);
  } catch (error) {
    console.error(error.message);
    console.error('Error 1833 occured');
    errorToast('Error occured');
  }
};

deleteExpense.propTypes = {
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default deleteExpense;
