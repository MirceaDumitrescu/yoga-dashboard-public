import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './viewExpenses.css';
import deleteExpense from '../../features/reducers/db-removals/deleteExpense';
import PropTypes from 'prop-types';
import { thisMonthString } from '../../utils/constants';

/**
 *
 * Function to view modal with expenses
 * and ability to delete them
 *
 * @param {*} props
 * @param {*} props.show: boolean
 * @param {*} props.handleClose: function
 * @returns
 */
const ViewExpenses = (props) => {
  const dbExpenses = useSelector((state) => state.expenses.value);
  const dispatch = useDispatch();

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>View all expenses this Month</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dbExpenses.map((expense) => {
            if (expense.month === thisMonthString) {
              return (
                <div className="expense-info" key={expense.id}>
                  <p>
                    {expense.desc} - {expense.amount} Ron
                  </p>
                  <Button variant="danger" onClick={() => deleteExpense(expense.id, dispatch)}>
                    Delete
                  </Button>
                </div>
              );
            } else {
              return null;
            }
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ViewExpenses.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ViewExpenses;
