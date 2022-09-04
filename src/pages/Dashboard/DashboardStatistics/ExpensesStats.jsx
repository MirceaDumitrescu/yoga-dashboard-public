import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { thisMonthString } from '../../../utils/constants';
/**
 *
 * @param {*} setShowExpensesHandler - function to set the state of the showExpenses variable which handles the view expense modal
 * @returns
 */
const ExpensesStats = ({ setShowExpensesHandler }) => {
  const expenses = useSelector((state) => state.expenses.value);

  // Filters the expenses by the month of the current date
  const filterExpensesByMonth = expenses.filter((expense) => {
    return expense.month === thisMonthString;
  });

  // Sums the expenses by month
  const totalExpenses = filterExpensesByMonth.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <>
      <div className="statistics-item">
        <p>Expenses this month</p>
        <p className="statistic-pharagraph">{totalExpenses} Ron</p>
        <p onClick={() => setShowExpensesHandler(true)} className="link small-paragraph">
          Click to view expenses
        </p>
      </div>
    </>
  );
};

ExpensesStats.propTypes = {
  setShowExpensesHandler: PropTypes.func.isRequired
};

export default ExpensesStats;
