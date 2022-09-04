import Alert from 'react-bootstrap/Alert';
import { useContext } from 'react';
import { NewModalContext } from '../context/NewModalContext';
import './newMemberModal.scss';

/**
 *
 * @returns the input fields for the user information
 *
 * Validation Checks are in place. Checks if the user already exists.
 * 1. Checks if the name is too short.
 * 2. Checks if the email already exists.
 * 3. Checks if the phone number already exists.
 *
 * @using <Alert /> throws errors if the user does not meet the requirements.
 *
 */

const UserValidChecks = () => {
  const { userInformation, setPartialUserInformation, validation, setValidation, reduxState } =
    useContext(NewModalContext);

  const handleUpdateFirstName = (event) => {
    setPartialUserInformation({ firstname: event.target.value });

    setValidation((prevState) => ({
      ...prevState,
      firstname: event.target.value.length > 2
    }));
  };
  const handleUpdateLastName = (event) => {
    setPartialUserInformation({ lastname: event.target.value });

    setValidation((prevState) => ({
      ...prevState,
      lastname: event.target.value.length > 2
    }));
  };
  const handleUpdateEmail = (event) => {
    setPartialUserInformation({ email: event.target.value });

    setValidation((prevState) => ({
      ...prevState,
      email: !reduxState.users.find((user) => user.email === event.target.value)
    }));
  };
  const handleUpdatePhone = (event) => {
    setPartialUserInformation({ phone: event.target.value });

    setValidation((prevState) => ({
      ...prevState,
      phone: !reduxState.users.find((user) => user.phone === event.target.value)
    }));
  };

  return (
    <section className='new-member-inputs'>
      <input
        type="text"
        placeholder="First Name"
        className="w-100 input-field"
        value={userInformation.firstname}
        onChange={handleUpdateFirstName}
        style={{
          outline: validation.isFirstNameValid ? '' : '1px solid red'
        }}
      />
      <Alert variant="danger" style={{ display: validation.isFirstNameValid ? 'none' : 'block' }}>
        The name is too short
      </Alert>
      <input
        type="text"
        placeholder="Last Name"
        className="w-100 input-field"
        value={userInformation.lastname}
        onChange={handleUpdateLastName}
        style={{
          outline: validation.isLastNameValid ? '' : '1px solid red'
        }}
      />
      <Alert variant="danger" style={{ display: validation.isLastNameValid ? 'none' : 'block' }}>
        The name is too short
      </Alert>
      <input
        type="text"
        placeholder="Email"
        className="w-100 input-field"
        value={userInformation.email}
        onChange={handleUpdateEmail}
        style={{
          outline: validation.isEmailValid ? '' : '1px solid red'
        }}
      />
      <Alert variant="danger" style={{ display: validation.isEmailValid ? 'none' : 'block' }}>
        The email already exists
      </Alert>
      <input
        type="text"
        placeholder="Phone"
        className="w-100 input-field"
        value={userInformation.phone}
        onChange={handleUpdatePhone}
        style={{
          outline: validation.isPhoneValid ? '' : '1px solid red'
        }}
      />
      <Alert variant="danger" style={{ display: validation.isPhoneValid ? 'none' : 'block' }}>
        That phone number already exists
      </Alert>
    </section>
  );
};

export default UserValidChecks;
