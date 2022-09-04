import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import '../ActivityLogs/Logs.css';
import NavBar from '../../../components/navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import uuid from 'react-uuid';
import { errorToast } from '../../../components/toasts/errorToasts';
import ReactPaginate from 'react-paginate';
import FinancialFilter from './FinancialFilters';
import { useNavigate } from 'react-router-dom';

const FinancialLogs = () => {
  const logs = useSelector((state) => state.logs.value);
  const users = useSelector((state) => state.users.value);
  const haveData = useSelector((state) => state.dataStatus.value);
  const [logsPaginated, setLogsPaginated] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 25;
  const navigate = useNavigate();

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      users: users,
      logs: logsWithMoneySpent,
      haveData: haveData
    }));
  }, [logs, haveData, users]);

  //Filters the new logs that did not have all the DB data
  const logsWithMoneySpent = logs.filter((log) => {
    if (Number(log.moneySpent) > 0 && (log.action === 'Create' || log.action === 'Update')) {
      return log;
    }
  });

  const [data, setData] = useState({
    users: users,
    logs: logsWithMoneySpent,
    haveData: haveData
  });

  // partial to handle changed data passed through context to recycle code
  const setPartialLogs = (logs) => {
    setData({
      ...data,
      logs: logs ? logs : logsWithMoneySpent
    });
  };

  /**
   *
   * @param {*} pageNumberEvent - The page number that was clicked
   * @returns {void} - Sets the page number to the page number that was clicked
   */
  const handlePageClick = (pageNumberEvent) => {
    const newOffset = (pageNumberEvent.selected * itemsPerPage) % data.logs.length;
    setItemOffset(newOffset);
  };

  /**
   *
   * @param {*} userClickEvent - event that is passed from the user click
   * @returns {*} - returns the user id of the user that was clicked and opens the edit Modal
   */
  const handleGetUser = (userClickEvent) => {
    if (!data.users.find((user) => user.uuid === userClickEvent.target.id)) {
      console.error('User was already deleted from the database');
      errorToast('User is removed');
      return;
    } else {
      navigate(`/user/${data.users.find((user) => user.uuid === userClickEvent.target.id).id}`);
    }
  };

  /**
   *
   * Creates the pagination for the logs. Logs Paginated is the array of logs that is sliced based on the offset and the items per page
   * @returns {void} - Sets the logsPaginated to the sliced array of logs
   *
   */
  useEffect(() => {
    if (!data.logs) {
      return null;
    }
    const endOffset = itemOffset + itemsPerPage;
    setLogsPaginated(data.logs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.logs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data.logs]);

  if (!haveData || !logs) {
    return (
      <div className="App">
        <Spinner animation="border" variant="primary" className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <h1 className="logs-page-title">Financial Logs</h1>
      <div className="logs-page">
        <FinancialFilter logs={data.logs} setPartialLogs={setPartialLogs} />

        <ul className="logs-content__log--list list-header">
          <li>Date</li>
          <li>Action</li>
          <li>Trainer</li>
          <li>Client Name</li>
          <li>Amount</li>
        </ul>

        {logsPaginated.length < 1 ? (
          <p>No logs to display</p>
        ) : (
          <div>
            {logsPaginated.map((log) => {
              return (
                <div key={uuid()} className="logs-content__log">
                  <ul className="logs-content__log--list">
                    <li className="log--date">{log.date}</li>
                    <li className={log.action === 'Create' ? 'log-create' : 'log-update'}>
                      {log.action}
                    </li>
                    <li>{log.trainer}</li>
                    <li onClick={handleGetUser} id={log.uuid} className="log-uuid">
                      {log.firstname} {log.lastname}
                    </li>
                    <li className="log-moneySpent">+{log.moneySpent} Ron</li>
                  </ul>
                </div>
              );
            })}
          </div>
        )}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      </div>
      <Footer />
    </div>
  );
};

export default FinancialLogs;
