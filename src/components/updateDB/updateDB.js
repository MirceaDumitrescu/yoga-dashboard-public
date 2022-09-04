import getUsers, {
  getFinances,
  getParticipants,
  getExpenses,
  getTrainerParticipants,
  getTrainerCollections,
  getLogs,
  getTrainerData,
  getRenewals
} from '../api/api.users';
import { fetchUsers } from '../../features/reducers/users';
import { fetchFinances } from '../../features/reducers/finances';
import { fetchClassParticipants } from '../../features/reducers/classes';
import { fetchExpenses } from '../../features/reducers/expenses';
import { fetchTrainerParticipantsData } from '../../features/reducers/trainerParticipants';
import { fetchTrainerCollectionData } from '../../features/reducers/trainerCollection';
import { fetchLogs } from '../../features/reducers/logsReducer';
import { fetchTrainerData } from '../../features/reducers/trainerData';
import { fetchRenewals } from '../../features/reducers/renewals';
import PropTypes from 'prop-types';
/**
 *
 * @param {*} dispatch
 * @returns {Promise}
 */
const updateDBQuery = (dispatch) => {
  Promise.all([
    getUsers(),
    getFinances(),
    getParticipants(),
    getExpenses(),
    getTrainerParticipants(),
    getTrainerCollections(),
    getLogs(),
    getTrainerData(),
    getRenewals()
  ]).then(
    ([
      users,
      finances,
      participants,
      expenses,
      trainerParticipants,
      trainerCollections,
      logs,
      trainerData,
      renewals
    ]) => {
      dispatch(fetchUsers(users));
      dispatch(fetchFinances(finances));
      dispatch(fetchClassParticipants(participants));
      dispatch(fetchExpenses(expenses));
      dispatch(fetchTrainerParticipantsData(trainerParticipants));
      dispatch(fetchTrainerCollectionData(trainerCollections));
      dispatch(fetchTrainerData(trainerData));
      dispatch(fetchLogs(logs));
      dispatch(fetchRenewals(renewals));
    }
  );
};

updateDBQuery.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default updateDBQuery;
