import PropTypes from 'prop-types';
import { today } from '../../utils/constants';

const trainerInterface = (userInformation, reduxState, action) => {
  return {
    type: action,
    client: userInformation.firstname + ' ' + userInformation.lastname,
    name: reduxState?.name || '',
    clientId: userInformation.uuid,
    email: reduxState.loggedInTrainer.email,
    collections: Number(userInformation.moneySpent) || 0,
    participants: action === 'Participate' ? 1 : 0,
    dateCreated: today,
    dateOfParticipant: userInformation.AddToClassDate ? userInformation.AddToClassDate : ''
  };
};

trainerInterface.PropTypes = {
  reduxState: PropTypes.object.isRequired,
  userInformation: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired
};

export default trainerInterface;
