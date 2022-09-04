import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../features/reducers/users';
import { fetchFinances } from '../../features/reducers/finances';
import { fetchExpenses } from '../../features/reducers/expenses';
import { fetchEmail, fetchLoginStatus } from '../../features/reducers/loggedIn';
import { fetchDbStatus } from '../../features/reducers/dataStatus';
import { fetchClassParticipants } from '../../features/reducers/classes';
import { fetchTrainerCollectionData } from '../../features/reducers/trainerCollection';
import { fetchLogs } from '../../features/reducers/logsReducer';
import { fetchTrainerData } from '../../features/reducers/trainerData';
import { fetchRenewals } from '../../features/reducers/renewals';

import getUsers, {
  getExpenses,
  getFinances,
  getLogs,
  getParticipants,
  getTrainerCollections,
  getTrainerData,
  getRenewals
} from './api.users';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

/**
 *
 * It gets called in index.js
 * to fetch all data before page renders
 * and dispatch them to redux store
 *
 * @returns {object}
 */
const DatabaseService = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  useEffect(() => {
    Promise.all([
      getUsers(),
      getFinances(),
      getExpenses(),
      getParticipants(),
      getTrainerCollections(),
      getLogs(),
      getTrainerData(),
      getRenewals()
    ]).then(
      ([
        users,
        finances,
        expenses,
        participants,
        trainerCollection,
        logs,
        trainerData,
        renewals
      ]) => {
        dispatch(fetchUsers(users));
        dispatch(fetchFinances(finances));
        dispatch(fetchExpenses(expenses));
        dispatch(fetchClassParticipants(participants));
        dispatch(fetchTrainerCollectionData(trainerCollection));
        dispatch(fetchLogs(logs));
        dispatch(fetchTrainerData(trainerData));
        dispatch(fetchRenewals(renewals));
        dispatch(fetchDbStatus(true));
      }
    );
  }, [dispatch]);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    user?.email ? dispatch(fetchEmail(user.email)) : dispatch(fetchEmail(''));
    user ? dispatch(fetchLoginStatus(true)) : dispatch(fetchLoginStatus(false));
  });
  return null;
};

const fetchUsersApi = (dispatch) => {
  getUsers()
    .then((users) => {
      dispatch(fetchUsers(users));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(fetchDbStatus(true));
    });
};

const fetchClassesApi = (dispatch) => {
  getParticipants()
    .then((participants) => {
      dispatch(fetchClassParticipants(participants));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(fetchDbStatus(true));
    });
};

export default DatabaseService;
export { fetchUsersApi, fetchClassesApi };
