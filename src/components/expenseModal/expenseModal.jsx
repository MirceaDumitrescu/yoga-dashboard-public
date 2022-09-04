import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../api/firebase';
import '../memberModal/EditMemberModal.scss';
import PropTypes from 'prop-types';
import updateDBQuery from '../updateDB/updateDB';
import { succesToast } from '../toasts/successToasts';
import { errorToast } from '../toasts/errorToasts';
import { useDispatch } from 'react-redux';
import { thisMonthString } from '../../utils/constants';

/**
 *
 * Function to add an expense to the database
 *
 * @param {*} props
 * @param {*} props.show: boolean
 * @param {*} props.handleClose: function
 * @returns {JSX}
 */
const ExpenseModal = (props) => {
  const dispatch = useDispatch();
  const expensesRef = collection(db, 'expenses');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateAmount = (event) => {
    setAmount(event.target.value);
  };
  /**
   * Function handles the actual database insertion
   * Dispatch the success or error toasts
   */
  const handleExpenseCreation = async () => {
    if (description.length < 3 || amount === '') {
      errorToast('Error occured');
      console.error('Error 1822 occured');
    } else {
      try {
        await addDoc(expensesRef, {
          desc: description,
          amount: Number(amount),
          month: thisMonthString
        });

        succesToast('Expense added');
      } catch (error) {
        console.error(error.message);
        console.error('Error 1823 occured');
        errorToast('Error occured');
      }
    }
    props.handleClose();
    await updateDBQuery(dispatch);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              placeholder="Description"
              className="w-100 input-field"
              value={description}
              onChange={handleUpdateDescription}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-100 input-field"
              value={amount}
              onChange={handleUpdateAmount}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleExpenseCreation}>
            Submit
          </Button>
          <Button variant="light" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ExpenseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ExpenseModal;
