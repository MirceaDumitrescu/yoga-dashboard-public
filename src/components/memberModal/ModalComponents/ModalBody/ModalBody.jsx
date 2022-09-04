import ModalBodyEdit from './ModalBodyEdit';
import ModalBodyView from './ModalBodyView';
import ModalBodyHistory from './ModalBodyHistory';
import ModalBodyMembership from './ModalBodyMembership';
import { useEffect } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import { useContext } from 'react';

const ModalBody = () => {

  const { activePage, setActivePage } = useContext(ModalContext);

  const ModalToDisplay = () => {
    switch (activePage) {
      case 'view':
        return <ModalBodyView />;
      case 'edit':
        return <ModalBodyEdit />;
      case 'history':
        return <ModalBodyHistory />;
      case 'membership':
        return <ModalBodyMembership />;
      default:
        return <ModalBodyView />;
    }
  };

  useEffect(() => {
    return () => {
      setActivePage('view');
    };
  }, []);

  return (
    <div className="profile-container">
      <section className="profile-container__side">
        <p id={activePage === 'view' ? 'profile-container__side--active' : ''}>
          <i className="far fa-address-card"></i>
          <span onClick={() => setActivePage('view')}>Profile</span>
        </p>
        <p id={activePage === 'edit' ? 'profile-container__side--active' : ''}>
          <i className="fas fa-align-justify"></i>
          <span onClick={() => setActivePage('edit')}>Edit User</span>
        </p>
        <p id={activePage === 'membership' ? 'profile-container__side--active' : ''}>
          <i className="far fa-calendar-alt"></i>
          <span onClick={() => setActivePage('membership')}>Membership</span>
        </p>
        <p id={activePage === 'history' ? 'profile-container__side--active' : ''}>
          <i className="fas fa-history"></i>
          <span onClick={() => setActivePage('history')}>History</span>
        </p>
      </section>
      <ModalToDisplay />
    </div>
  );
};

export default ModalBody;
