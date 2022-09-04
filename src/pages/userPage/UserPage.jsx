import React, { useEffect } from 'react';
import NavBar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import './UserPage.css';
import Button from 'react-bootstrap/Button';
import { Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deleteUser from '../../features/reducers/db-removals/deleteClient';
import ToastContainerComponent from '../../components/toasts/toastContainer';
import { db } from '../../components/api/firebase';
import Pagination from '../../components/pagination/pagination';
import { collection } from 'firebase/firestore';
import { fetchUsersApi } from '../../components/api/api.service';

const UserPage = () => {

  const dispatch = useDispatch();
  const loggedInTrainer = useSelector((state) => state.loggedIn);
  const loggingInformation = useSelector((state) => state.loggingInformation);
  const isDbConnected = useSelector((state) => state.dataStatus.value);
  const users = useSelector((state) => state.users.value);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [reduxState, setReduxState] = useState({});
  const [userInformation, setUserInformation] = useState({});
  const [activeMembersOnly, setActiveMembersOnly] = useState({});
  const [sortedUsers, setSortedUsers] = useState([]);
  const itemsPerPage = 10;



  const handleClose = () => setShowDeleteModal(false);

  const dateSortedUsers = useMemo(() => {
    const data = isDbConnected
      ? users
          .filter((user) => user.creation_date)
          .sort((a, b) => {
            const aDate = a.creation_date.split('-').join('');
            const bDate = b.creation_date.split('-').join('');
            return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
          })
      : [];
    return data;
  }, [users, isDbConnected]);

  const handleUserDelete = (id) => {
    setShowDeleteModal(true);
    setUserId(id);

    users.filter((user) => {
      if (user.id === id) {
        setUserInformation(user);
      }
      return null;
    });
  };

  useEffect(() => {
    fetchUsersApi( dispatch )
  }, []);

  useEffect(() => {
    setReduxState((prevState) => ({
      ...prevState,
      loggingInformation: loggingInformation,
      loggedInTrainer: loggedInTrainer,
      logsCollectionRef: collection(db, 'logs'),
      usersCollectionRef: collection(db, 'users')
    }));
  }, [loggedInTrainer, loggingInformation]);

  useEffect(() => {
    isDbConnected ? setActiveMembersOnly(users.filter((user) => user.active)) : setActiveMembersOnly([]);
  }, [users, isDbConnected]);


  return (
    <>
      <NavBar />;
      <div className="container-userpage">
        <div className="userpage-header">
          <p className="total-members">Total members: {users?.length}</p>
          <p className="total-members">Total Active members: {activeMembersOnly?.length}</p>
        </div>
        <div className="user-name user-name__titles">
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Sessions</p>
          <p>Created</p>
        </div>
        <div className="separator"></div>

        {!isDbConnected && (
            (
            <div className="App">
              <Spinner animation="border" variant="primary" className="spinner" />
            </div>
          )
        )}

        {isDbConnected && sortedUsers.map((user) => (
          <div key={user.id}>
            <div className="user-name">
              <Link to={`/user/${user.id}`}>
              <p id={user.id} className="name-ref list-item">
                {user.firstname} {user.lastname}
              </p>
              </Link>
              <p className="list-item email-item">{user.email}</p>
              <p className="list-item phone-item">{user.phone}</p>
              <p className="list-item sessions-item">{user.current_sessions}</p>
              <p className="list-item">{user.creation_date}</p>
              <Button
                variant="danger"
                onClick={() => handleUserDelete(user.id)}
                className="remove-button">
                Delete
              </Button>
            </div>
            <div className="separator"></div>
          </div>
        ))}

        <Pagination
          setCallback={setSortedUsers}
          pageRangeDisplayed={5}
          itemsPerPage={itemsPerPage}
          filteredData={dateSortedUsers}
          location="users"
        />
      </div>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to delete this user?</h4>
          <p>
            This will permanently delete the user from the database and all the information related
            to it.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              deleteUser(userId, setShowDeleteModal, dispatch, userInformation, reduxState)
            }>
            Delete
          </Button>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainerComponent />
      <Footer />
    </>
  );
};

export default UserPage;
