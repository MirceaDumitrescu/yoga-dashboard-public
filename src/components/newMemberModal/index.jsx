import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { collection, doc } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import createUser from '../../features/userCreation/userCreation';
import MembershipInputs from './MembershipInformation';
import UserValidChecks from './UserInformation';
import ToastContainerComponent from '../toasts/toastContainer';
import { errorToast } from '../toasts/errorToasts';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { NewModalContext } from '../context/NewModalContext';
import { thisMonthString, today } from '../../utils/constants';
import moment from 'moment';

//Styles
import 'react-toastify/dist/ReactToastify.css';
import './newMemberModal.scss';

/**
 *
 * Creates a popup modal that allows a trainer
 * to create a new user.
 *
 * @param {*} props
 * @returns {JSX}
 */

const CreateUserModal = (props) => {
  const { show, handleClose } = props;
  const dispatch = useDispatch();

  const [userInformation, setUserInformation] = useState({});
  const expirationDate = moment(today).add(30, 'd').format('YYYY-MM-DD');
  const setPartialUserInformation = (value) => {
    setUserInformation({ ...userInformation, ...value });
  };

  const [validation, setValidation] = useState({
    isFirstNameValid: true,
    isLastNameValid: true,
    isEmailValid: true,
    isPhoneValid: true,
    isValid: true
  });
  const loggingInformation = useSelector((state) => state.loggingInformation);
  const finances = useSelector((state) => state.finances.value);
  const users = useSelector((state) => state.users.value);
  const logs = useSelector((state) => state.logs.value);
  const loggedInTrainer = useSelector((state) => state.loggedIn);
  const trainerData = useSelector((state) => state.trainerData.value);
  const trainerCollections = useSelector((state) => state.trainerCollection.value);

  const [reduxState, setReduxState] = useState({});

  const handleUserCreation = async () => {
    if (
      validation.isFirstNameValid &&
      validation.isLastNameValid &&
      validation.isEmailValid &&
      validation.isPhoneValid &&
      validation.isValid
    ) {
      await createUser(userInformation, reduxState, dispatch);
      handleClose();
    } else {
      errorToast('Please fill in all fields');
      console.error('Error 1502: User not created');
    }
  };

  useEffect(() => {
    setReduxState((prevState) => ({
      ...prevState,
      finances: finances,
      users: users,
      logs: logs,
      loggingInformation: loggingInformation,
      loggedInTrainer: loggedInTrainer,
      trainerCollections: trainerCollections,
      trainerData: trainerData,
      trainerRef: collection(db, 'trainers'),
      logsCollectionRef: collection(db, 'logs'),
      usersCollectionRef: collection(db, 'users'),
      financeCollectionRef: collection(db, 'finances'),
      newMemberCollectionRef: doc(db, 'new_members', 'new_members')
    }));
  }, [
    finances,
    users,
    logs,
    loggedInTrainer,
    trainerCollections,
    trainerData,
    loggingInformation
  ]);

  useEffect(() => {
    setUserInformation((prevState) => ({
      ...prevState,
      creationDate: today,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      moneySpent: 0,
      sessions: 0,
      startingDate: today,
      expiration_date: expirationDate,
      thisMonthString: thisMonthString,
      uuid: uuid()
    }));
  }, []);

  return (
    <>
      <NewModalContext.Provider
        value={{
          userInformation,
          setPartialUserInformation,
          validation,
          setValidation,
          reduxState
        }}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <UserValidChecks />
              <MembershipInputs />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleUserCreation}
              disabled={
                userInformation.firstname < 3 ||
                userInformation.lastname < 3 ||
                validation.isValid === false
              }>
              Submit
            </Button>
            <Button variant="light" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainerComponent />
      </NewModalContext.Provider>
    </>
  );
};

CreateUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CreateUserModal;
