import uuid from 'react-uuid';
import moment from 'moment';

const userInterface = (userInformation) => {
  return {
    creation_date: userInformation.creationDate,
    firstname: userInformation.firstname,
    lastname: userInformation.lastname,
    email: userInformation.email,
    phone: userInformation.phone,
    current_sessions: Number(userInformation.sessions),
    starting_date: userInformation.startingDate,
    expiration_date: moment(userInformation.startingDate).add(30, 'd').format('YYYY-MM-DD'),
    active: true,
    money_spent: Number(userInformation.moneySpent),
    last_entry: '',
    observation: '',
    uuid: userInformation.uuid ? userInformation.uuid : uuid(),
    entries: [],
    renewals: []
  };
};

export default userInterface;
