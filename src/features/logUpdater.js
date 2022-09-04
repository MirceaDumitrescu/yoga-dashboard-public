import { addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} logInterface - the user information
 * @param {*} reduxState - the state object containing all the collections
 */
const updateLogs = async (reduxState, logInterface) => {
  await addDoc(reduxState.logsCollectionRef, logInterface);
};

updateLogs.propTypes = {
  userInformation: PropTypes.object.isRequired,
  stateObject: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired
};

export default updateLogs;
