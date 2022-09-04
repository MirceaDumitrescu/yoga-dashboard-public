import { succesToast } from '../components/toasts/successToasts';
import { errorToast } from '../components/toasts/errorToasts';
import { deleteDoc, doc } from 'firebase/firestore';
import updateDBQuery from '../components/updateDB/updateDB';
import PropTypes from 'prop-types';
import { db } from '../components/api/firebase';

const archiveClass = (date, dispatch) => {
  const dbClasses = doc(db, 'classes', date);
  try {
    deleteDoc(dbClasses);
    succesToast('Class archived');
    updateDBQuery(dispatch);
  } catch (error) {
    console.error(error.message);
    console.error('Error 1753 occured');
    errorToast('Error occured');
  }
};

archiveClass.propTypes = {
  date: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default archiveClass;
