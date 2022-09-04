import ClassesReducer from './reducers/classes';
import TrainerCollectionReducer from './reducers/trainerCollection';
import TrainerParticipantsReducer from './reducers/trainerParticipants';
import LogsReducer from './reducers/logsReducer';
import DbReducer from './reducers/dataStatus';
import LoginReducer from './reducers/loggedIn';
import userReducer from './reducers/users';
import financeReducer from './reducers/finances';
import expensesReducer from './reducers/expenses';
import { configureStore } from '@reduxjs/toolkit';
import trainerData from './reducers/trainerData';
import renewalsReducer from './reducers/renewals';

const store = configureStore({
  reducer: {
    users: userReducer,
    finances: financeReducer,
    expenses: expensesReducer,
    dataStatus: DbReducer,
    loggedIn: LoginReducer,
    classes: ClassesReducer,
    trainerCollection: TrainerCollectionReducer,
    trainerParticipants: TrainerParticipantsReducer,
    logs: LogsReducer,
    trainerData: trainerData,
    renewals: renewalsReducer
  }
});

export default store;
