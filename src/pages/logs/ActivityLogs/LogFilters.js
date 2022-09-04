import PropTypes from 'prop-types';
import { errorToast } from '../../../components/toasts/errorToasts';
import uuid from 'react-uuid';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogFilters = (props) => {
  const { data, logsToDisplay } = props;
  const navigate = useNavigate();

  const handleGetUser = (e) => {
    if (!data.users.find((user) => user.uuid === e.target.id)) {
      console.error('User was already deleted from the database');
      errorToast('User is removed');
    } else {
      navigate(`/user/${data.users.find((user) => user.uuid === e.target.id).id}`);
    }
  };

  const [logs, setLogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setLogs(logsToDisplay.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(logsToDisplay.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, logsToDisplay]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % logsToDisplay.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      {logs.map((log) => {
        return (
          <div key={uuid()} className="logs-content__log">
            <ul className="logs-content__log--list">
              <li className="log--date">{log.date}</li>
              <li
                className={
                  log.action === 'Create'
                    ? 'log-create'
                    : log.action === 'Delete'
                    ? 'log-delete'
                    : log.action === 'Remove'
                    ? 'log-remove'
                    : log.action === 'Update'
                    ? 'log-update'
                    : 'log-participate'
                }>
                {log.action}
              </li>
              <li>{log.trainer}</li>
              <li onClick={handleGetUser} id={log.uuid} className="log-uuid">
                {log.firstname} {log.lastname}
              </li>
              <li onClick={handleGetUser} id={log.uuid} className="log-uuid">
                {log.email}
              </li>
            </ul>
          </div>
        );
      })}
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
  );
};

LogFilters.propTypes = {
  data: PropTypes.object.isRequired,
  logsToDisplay: PropTypes.array.isRequired
};

export default LogFilters;
