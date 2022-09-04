import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const database = collection(db, 'users');
const finances = collection(db, 'finances');
const expenses = collection(db, 'expenses');
const classes = collection(db, 'classes');
const trainersData = collection(db, 'trainers');
const trainerCollection = collection(db, 'trainer-collections');
const trainerParticipants = collection(db, 'trainer-participants');
const renewals = collection(db, 'renewals');
const logs = collection(db, 'logs');

const getRenewals = async () => {
  try {
    const result = await getDocs(renewals);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};
const getTrainerData = async () => {
  try {
    const trainers = await getDocs(trainersData);
    return trainers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};
const getLogs = async () => {
  try {
    const result = await getDocs(logs);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error);
  }
};

const getFinances = async () => {
  try {
    const financesDocs = await getDocs(finances);
    return financesDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};

const getTrainerCollections = async () => {
  try {
    const trainersDocs = await getDocs(trainerCollection);
    return trainersDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};

const getTrainerParticipants = async () => {
  try {
    const participantsDocs = await getDocs(trainerParticipants);
    return participantsDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
  } catch (error) {
    console.error(error.message);
  }
};

const getExpenses = async () => {
  try {
    const expensesDoc = await getDocs(expenses);
    return expensesDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};

const getUsers = async () => {
  try {
    const dbUsers = await getDocs(database);
    return dbUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};

const getParticipants = async () => {
  try {
    const participants = await getDocs(classes);
    return participants.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error.message);
  }
};

export default getUsers;
export {
  getFinances,
  getExpenses,
  getParticipants,
  getTrainerCollections,
  getTrainerParticipants,
  getLogs,
  getTrainerData,
  getRenewals
};
