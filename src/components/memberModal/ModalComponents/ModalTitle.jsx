import PropTypes from 'prop-types';
import moment from 'moment';
import { useState, useEffect } from 'react';

const ModalTitle = ({ editableUser, calculateExpirationDate }) => {
  const [isExpired, setIsExpired] = useState(false);
  const [noSessionsLeft, setNoSessionsLeft] = useState(false);
  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    setNoSessionsLeft(editableUser?.current_sessions === 0);

    if (editableUser?.expiration_date) {
      setIsExpired(moment(editableUser?.expiration_date).isBefore(today));
    } else {
      const newExpirationDate = calculateExpirationDate(editableUser?.starting_date);
      const newExpirationDateFormatted = moment(newExpirationDate).format('YYYY-MM-DD');
      setIsExpired(moment(newExpirationDateFormatted).isBefore(today));
    }
  }, [editableUser]);

  return (
    <div className="modal-header__title">
      <h1 className="modal-header__name">
        {editableUser?.firstname} {editableUser?.lastname}{' '}
      </h1>
      <div>
        {noSessionsLeft && <i className="fas fa-user-slash modal-header--expired_sessions"></i>}
        {isExpired && <i className="fas fa-calendar-times modal-header--expired_membership"></i>}
        {!isExpired && !noSessionsLeft && <p className="modal-header--active">ACTIVE</p>}
      </div>
    </div>
  );
};

ModalTitle.propTypes = {
  editableUser: PropTypes.object,
  calculateExpirationDate: PropTypes.func
};

export default ModalTitle;
