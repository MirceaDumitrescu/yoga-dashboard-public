import { today } from '../../utils/constants';
import uuid from 'react-uuid';

const logInterface = (userInformation, reduxState, action) => {
  return {
    firstname: userInformation.firstname,
    lastname: userInformation.lastname,
    email: userInformation.email,
    moneySpent: userInformation.moneySpent || 0,
    sessions: userInformation.sessions || 0,
    uuid: userInformation.uuid
      ? userInformation.uuid
      : action === 'Create'
      ? uuid()
      : 'no UUID found',
    trainer: reduxState.loggedInTrainer.email,
    action: action,
    date: today
  };
};

export default logInterface;
