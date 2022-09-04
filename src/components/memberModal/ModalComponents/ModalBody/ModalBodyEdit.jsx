import ProfileAvatar from '../ProfileAvatar';
import Alert from 'react-bootstrap/Alert';
import { ModalContext } from '../../../context/ModalContext';
import { useContext } from 'react';

const ModalBodyEdit = () => {
  const { userInformation, handleUpdate, setPartialUserInformation } = useContext(ModalContext);

  const handleUpdateFirstName = (event) => {
    setPartialUserInformation({ firstname: event.target.value });
  };
  const handleUpdateLastName = (event) => {
    setPartialUserInformation({ lastname: event.target.value });
  };
  const handleUpdateEmail = (event) => {
    setPartialUserInformation({ email: event.target.value });
  };
  const handleUpdatePhone = (event) => {
    setPartialUserInformation({ phone: event.target.value });
  };
  const handleUpdateObservation = (event) => {
    setPartialUserInformation({ observation: event.target.value });
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <section className="profile-container__edit">
      <main className="profile-edit__container">
        <form>
          <section className="profile-details">
            <h1>Edit User Data</h1>
            <input
              type="text"
              placeholder={userInformation?.firstname ? userInformation.firstname : 'FirstName'}
              className="w-100 input-field"
              value={userInformation.firstname}
              onChange={(event) => handleUpdateFirstName(event)}
              onKeyDown={(event) => handleEnterPress(event)}
            />
            <input
              type="text"
              placeholder={userInformation?.lastname ? userInformation.lastname : 'LastName'}
              className="w-100 input-field"
              value={userInformation.lastname}
              onChange={(event) => handleUpdateLastName(event)}
              onKeyDown={(event) => handleEnterPress(event)}
            />
            <input
              type="text"
              placeholder={userInformation?.email ? userInformation?.email : 'Email'}
              className="w-100 input-field"
              value={userInformation.email}
              onChange={(event) => handleUpdateEmail(event)}
              onKeyDown={(event) => handleEnterPress(event)}
            />
            <input
              type="text"
              placeholder={userInformation?.phone ? userInformation?.phone : 'Phone'}
              className="w-100 input-field"
              value={userInformation.phone}
              onChange={(event) => handleUpdatePhone(event)}
              onKeyDown={(event) => handleEnterPress(event)}
            />
            <textarea
              placeholder={
                userInformation?.observation ? userInformation.observation : 'Observations'
              }
              className="w-100 input-field"
              value={userInformation.observation}
              onChange={(event) => handleUpdateObservation(event)}
              rows={5}
              cols={5}
            />

            <Alert
              variant="danger"
              style={{
                display: userInformation.MembershipError ? 'block' : 'none'
              }}>
              Cost must not be empty. You are adding{' '}
              {userInformation.sessions - userInformation?.current_sessions} sessions to the user.
              Average session cost is 30 Ron. So the Cost should be around:{' '}
              {30 * (userInformation.sessions - userInformation?.current_sessions)} Ron.
            </Alert>
          </section>
        </form>
      </main>
      <ProfileAvatar userInformation={userInformation} />
    </section>
  );
};

export default ModalBodyEdit;
