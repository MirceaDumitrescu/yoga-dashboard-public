import { ModalContext } from '../../../context/ModalContext';
import { useContext } from 'react';

const ModalBodyMembership = () => {
  const {
    userInformation,
    setPartialUserInformation,
    setExpirationDate,
    calculateExpirationDate,
    handleUpdate
  } = useContext(ModalContext);

  const handleStartingDateChange = (event) => {
    setPartialUserInformation({
      startingDate: event.target.value
    });

    setExpirationDate({
      newExpirationDate: calculateExpirationDate(event.target.value)
    });
  };

  const handleSetMoneySpent = (event) => {
    if (isNaN(Number(event.target.value))) {
      return;
    }
    setPartialUserInformation({
      moneySpent: Number(event.target.value)
    });
  };

  const handleMembershipChange = (event) => {
    if (isNaN(Number(event.target.value))) {
      return;
    }
    setPartialUserInformation({
      sessions: Number(event.target.value)
    });
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <section className="profile-container__membership">
      <aside className="membership-type">
        <section className="number-inputs">
          <div className="membership-type__sessions">
            <p
              className="hidden-current-sessions"
              style={{
                visibility: userInformation.showHistory ? 'visible' : 'hidden'
              }}>
              {userInformation?.current_sessions}
            </p>
            <input
              type="text"
              placeholder="Number of sessions"
              className="input-field sessions-input"
              value={
                userInformation.sessions === ''
                  ? userInformation?.current_sessions
                  : userInformation.sessions
              }
              onChange={(event) => handleMembershipChange(event)}
              style={{
                outline: userInformation.isNumber ? '' : '1px solid red'
              }}
              onKeyDown={(event) => handleEnterPress(event)}
            />
            <p className="custom-date__info">Sessions</p>
          </div>
          <div className="membership-type__cost">
            <input
              type="text"
              placeholder="Cost"
              className="input-field sessions-input"
              value={userInformation.moneySpent}
              onChange={(event) => handleSetMoneySpent(event)}
              style={{
                outline: userInformation.MembershipError ? '1px solid red' : ''
              }}
              onKeyDown={(event) => handleEnterPress(event)}
            />
            <p className="custom-date__info">Membership cost</p>
          </div>
        </section>
        <aside className="membership-info">
            <h4>FAQ</h4>
            <p>
              Changing the sessions will permanently change the total number of the clients
              sessions. Make sure you add the proper amount of sessions you want the client to have
              in TOTAL.
            </p>
          </aside>
      </aside>
      <div className="membership-type__date">
          <div className="exp-date">
            <p>Current Expiration date: {userInformation?.expiration_date}</p>
          </div>
          <input
            type="date"
            id="date"
            placeholder="Date"
            className="w-100 membership-field"
            value={userInformation.startingDate}
            onChange={(event) => handleStartingDateChange(event)}
          />
        </div>
    </section>
  );
};

export default ModalBodyMembership;
