import { today } from '../../utils/constants';

const renewalInterface = (userInformation, trainerEmail, expirationDate) => {
  return {
    firstname: userInformation.firstname,
    lastname: userInformation.lastname,
    email: userInformation.email,
    moneySpent: userInformation.moneySpent || 0,
    sessions: userInformation.sessions || 0,
    uuid: userInformation.uuid,
    trainer: trainerEmail,
    date: today,
    oldExpirationDate: expirationDate.oldExpirationDate || '',
    newExpirationDate: expirationDate.newExpirationDate || ''
  };
};

export default renewalInterface;
