import { useDispatch } from 'react-redux';
import handleUserRemoval from '../../features/reducers/db-removals/removeClassParticipant';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClassContext } from '../../components/context/ClassContext';
import { useEffect } from 'react';

/**
 *
 * @param {*} state - redux state containing users, classes, and loggedInTrainer
 * @param {*} date - contains class data based on its date and passed from ClassRendering.js
 * @returns {JSX}
 */
const ClassParticipants = ({ date }) => {
  const dispatch = useDispatch();
  const { state } = useContext(ClassContext);


  useEffect(() => {
    // unmounting component
    return () => {
      console.log('unmounting ClassParticipants');
    }
  }, []);

  return (
    <div className="class-participants-list">
      {state.users.map((user) => {
        if (date.participants.includes(user.id)) {
          return (
            <div key={user.id} className="class-participant-container">
              <div id={user.id} className="participant-list">
                <i
                  className="far fa-calendar-times remove-participant"
                  onClick={() =>
                    handleUserRemoval(state, user.uuid, user.id, date.id, dispatch)
                  }></i>
                <Link to={`/user/${user.id}`}>
                <p>{user.firstname} {user.lastname}</p>
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

ClassParticipants.propTypes = {
  state: PropTypes.object,
  date: PropTypes.object
};

export default ClassParticipants;
