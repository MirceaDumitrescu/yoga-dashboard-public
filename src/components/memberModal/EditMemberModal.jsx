import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './EditMemberModal.scss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import addToClassModule from '../../features/addToClass';
import userUpdate from '../../features/userUpdater';
import PropTypes from 'prop-types';
import { collection } from 'firebase/firestore';
import { db } from '../api/firebase';
import ModalTitle from './ModalComponents/ModalTitle';
import ModalBody from './ModalComponents/ModalBody/ModalBody';
import ModalFooter from './ModalComponents/ModalFooter';
import { ModalContext } from '../context/ModalContext';
import { today } from '../../utils/constants';
import { Navigate, useParams } from 'react-router-dom';

/**
 *
 * Function that calculates the remaining time of
 * the current user's membership
 *
 * @param {*} date : date of the expense : string
 * @returns The date when the membership expires
 */
const calculateExpirationDate = (date) => {
  const currentDate = moment(date);
  return moment(currentDate).add(30, 'd').format('YYYY-MM-DD');
};

/**
 *
 * Modal that allows the trainer to edit and
 * see details of a member
 *
 * @param {*} props.show: boolean - shows the modal
 * @param {*} props.handleClose: function - closes the modal
 * @param {*} props.editMemberID: object - the member to edit
 * @returns {JSX}
 */
const EditModal = ({ show, handleClose, editMemberID }) => {
  const dispatch = useDispatch();
  const [editableUser, setEditableUser] = useState({});
  const users = useSelector((state) => state.users.value);
  const dbFinances = useSelector((state) => state.finances.value);
  const classes = useSelector((state) => state.classes.value);
  const logs = useSelector((state) => state.logs.value);
  const renewalState = useSelector((state) => state.renewals.value);
  const trainerParticipants = useSelector((state) => state.trainerParticipants.value);
  const trainerCollections = useSelector((state) => state.trainerCollection.value);
  const trainerData = useSelector((state) => state.trainerData.value);
  const loggedInTrainer = useSelector((state) => state.loggedIn);
  const [userInformation, setUserInformation] = useState({});
  const [reduxState, setReduxState] = useState({});
  const [activePage, setActivePage] = useState('view');
  const urlParams = useParams();

  if (!users) {
    return <Navigate to="/" replace />;
  }

  const [expirationDate, setExpirationDate] = useState({
    newExpirationDate: '',
    oldExpirationDate: ''
  });

  const userExpirationDate =
    userInformation.expiration_date || calculateExpirationDate(userInformation.starting_date);
  const isExpired = moment(userExpirationDate).isBefore(today);
  const hasNoSessions = userInformation.sessions <= 0;

  const setPartialUserInformation = (value) => {
    setUserInformation({ ...userInformation, ...value });
  };

  const addToClass = () => {
    addToClassModule(userInformation, reduxState, dispatch);
    handleClose();
  };

  const handleUpdate = () => {
    userUpdate(
      editableUser,
      userInformation,
      setPartialUserInformation,
      reduxState,
      dispatch,
      expirationDate
    );
    handleClose();
  };

  useEffect(() => {
    setEditableUser(() =>
      editMemberID ? users.filter((user) => user.id === editMemberID)[0] : null
    );
  }, [editMemberID, users]);

  useEffect(() => {
    editableUser &&
      setUserInformation((prevState) => ({
        ...prevState,
        firstname: editableUser.firstname || '',
        lastname: editableUser.lastname || '',
        email: editableUser.email || '',
        phone: editableUser.phone || '',
        observation: editableUser.observation || '',
        moneySpent: 0,
        sessions: editableUser.current_sessions || 0,
        startingDate: editableUser.starting_date,
        expiration_date: calculateExpirationDate(editableUser.starting_date),
        userId: editMemberID,
        AddToClassDate: today,
        showHistory: false,
        SameDayError: false,
        MembershipError: false,
        isNumber: true,
        uuid: editableUser.uuid || uuid(),
        new_renewals: {},
        entries: {}
      }));
  }, [editableUser, editMemberID]);

  useEffect(() => {
    setReduxState((prevState) => ({
      ...prevState,
      dbFinances: dbFinances,
      renewalState: renewalState,
      classes: classes,
      logs: logs,
      users: users,
      trainerData: trainerData,
      trainerRef: collection(db, 'trainers'),
      logsCollectionRef: collection(db, 'logs'),
      renewalsLogs: collection(db, 'renewals'),
      financeCollectionRef: collection(db, 'finances'),
      trainerParticipants: trainerParticipants,
      trainerCollections: trainerCollections,
      loggedInTrainer: loggedInTrainer
    }));
    setExpirationDate((prevState) => ({
      ...prevState,
      oldExpirationDate: userInformation.expiration_date
    }));
  }, [
    dbFinances,
    renewalState,
    classes,
    logs,
    trainerParticipants,
    trainerCollections,
    loggedInTrainer,
    trainerData,
    users,
    userInformation
  ]);

  return (
    <>
      <ModalContext.Provider
        value={{
          userInformation,
          setUserInformation,
          handleUpdate,
          setPartialUserInformation,
          setExpirationDate,
          isExpired,
          hasNoSessions,
          addToClass,
          calculateExpirationDate,
          urlParams,
          activePage,
          setActivePage
        }}>
        <Modal show={show} onHide={handleClose} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title className="client-name">
              <ModalTitle
                editableUser={editableUser}
                calculateExpirationDate={calculateExpirationDate}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <ModalBody />
          </Modal.Body>
          <Modal.Footer>
            <ModalFooter handleClose={handleClose} />
          </Modal.Footer>
        </Modal>
      </ModalContext.Provider>
    </>
  );
};

EditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editMemberID: PropTypes.string.isRequired
};

export default EditModal;
