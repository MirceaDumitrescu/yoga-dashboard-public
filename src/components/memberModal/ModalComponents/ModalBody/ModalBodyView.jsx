import { ModalContext } from '../../../context/ModalContext';
import { useContext, useEffect } from 'react';
import ProfileAvatar from '../ProfileAvatar';
import { Button } from 'react-bootstrap';

const ModalBodyView = () => {
  const { userInformation, setPartialUserInformation, addToClass, hasNoSessions, isExpired } =
    useContext(ModalContext);

  const handleAddToClassDate = (event) => {
    setPartialUserInformation({ AddToClassDate: event.target.value });
  };

  // unmount the component when the modal is closed
  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted ? isMounted = false : null;
    };
  }, []);


  return (
    <section className="profile-container__main">
      <main className="profile-container__profile">
        <section className="membership-view-info">
          <div className="membership-info__sessions">
            <p>
              {userInformation.sessions === ''
                ? userInformation?.current_sessions
                : userInformation.sessions}
            </p><span> Session/s left</span>
          </div>
          <div className="membership-type__date">
              <p>Current Expiration date: {userInformation?.expiration_date}</p>
          </div>
        </section>
        <section className="profile-details">
          <p className='view-input'>{userInformation.firstname}</p>
          <p className='view-input'>{userInformation.lastname}</p>
          <p className='view-input'>{userInformation.email}</p>
          <p className='view-input'>{userInformation.phone}</p>
          <p className='view-input'>{userInformation.observation}</p>
        </section>
        <form action="">
        <section className="add-to-class">
          <div className="custom-date">
            <input
              type="date"
              onChange={(event) => handleAddToClassDate(event)}
              value={userInformation.AddToClassDate}
              className="membership-field"
              style={{
                outline: userInformation.SameDayError ? '1px solid red' : ''
              }}
            />
            <label className="custom-date__info">*Custom date: (optional, default is today)</label>
          </div>
          <Button
            variant="danger"
            className="add-to-class__button"
            disabled={hasNoSessions || isExpired}
            onClick={addToClass}>
            Add to class
          </Button>
        </section>
      </form>
      </main>

      <ProfileAvatar userInformation={userInformation} />
    </section>
  );
};

export default ModalBodyView;
