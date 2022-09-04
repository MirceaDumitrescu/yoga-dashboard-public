import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { ModalContext } from '../../context/ModalContext';
import { useContext } from 'react';

const ModalFooter = ({ handleClose }) => {
  const { userInformation, handleUpdate } = useContext(ModalContext);
  return (
    <>
      <Button variant="primary" onClick={handleUpdate} disabled={!userInformation.isNumber}>
        Save Changes
      </Button>
      <Button variant="light" onClick={handleClose}>
        Close
      </Button>
    </>
  );
};

ModalFooter.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default ModalFooter;
