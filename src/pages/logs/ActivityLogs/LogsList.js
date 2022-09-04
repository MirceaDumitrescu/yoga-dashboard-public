import './Logs.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LogFilters from './LogFilters';

const LogsList = (props) => {
  const { data } = props;

  const [filters, setFilters] = useState({
    All: true,
    Create: false,
    Update: false,
    Delete: false,
    Remove: false,
    Participate: false
  });

  const createLogs = [...data.logs].filter((log) => log.action === 'Create');
  const updateLogs = [...data.logs].filter((log) => log.action === 'Update');
  const deleteLogs = [...data.logs].filter((log) => log.action === 'Delete');
  const removeLogs = [...data.logs].filter((log) => log.action === 'Remove');
  const participateLogs = [...data.logs].filter((log) => log.action === 'Participate');
  const dateSorted = [...data.logs].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const [logFilters, setLogFilters] = useState({});
  const [logsToDisplay, setLogsToDisplay] = useState(dateSorted);

  const filterByActionType = (e) => {
    /**
     *
     * Checks if the button is already active
     * If it is, it will remove the filter
     * If it is not, it will add the filter
     *
     */
    if (!filters[e.target.id]) {
      setFilters({ ...filters, [e.target.id]: true });
      setLogsToDisplay([...logFilters[e.target.id]]);

      //check if there is another filter that is active
      const activeFilters = Object.keys(filters).filter((filter) => {
        return filters[filter];
      });

      /**
       * Handles switching between filters
       */
      if (activeFilters.length > 0) {
        activeFilters.forEach((filter) => {
          if (filter !== e.target.id) {
            setFilters((prevState) => ({ ...prevState, [filter]: false }));
            setFilters((prevState) => ({ ...prevState, [e.target.id]: true }));
          }
        });
      }
    } else {
      setFilters({ ...filters, [e.target.id]: false });
      setLogsToDisplay([...dateSorted]);
    }
  };

  useEffect(() => {
    setLogFilters((prevState) => ({
      ...prevState,
      Create: createLogs,
      Update: updateLogs,
      Delete: deleteLogs,
      Remove: removeLogs,
      Participate: participateLogs,
      All: dateSorted
    }));

    setLogsToDisplay(dateSorted);
  }, []);

  return (
    <div>
      <div className="filter-container">
        <p className="filter-title">Filter by Action</p>
        {/* <div className="date-selector">
          <input type="date" id="All" onChange={filterByActionType} />
        </div> */}
        <div className="filter-buttons">
          <p
            className={filters.All ? 'filter-active' : 'filter-inactive'}
            onClick={filterByActionType}
            id="All">
            All Logs
          </p>
          <p
            className={filters.Create ? 'filter-active' : 'filter-inactive'}
            onClick={filterByActionType}
            id="Create">
            Create
          </p>
          <p
            className={filters.Delete ? 'filter-active' : 'filter-inactive'}
            onClick={filterByActionType}
            id="Delete">
            Delete
          </p>
          <p
            className={filters.Remove ? 'filter-active' : 'filter-inactive'}
            onClick={filterByActionType}
            id="Remove">
            Remove
          </p>

          <p
            className={filters.Update ? 'filter-active' : 'filter-inactive'}
            onClick={filterByActionType}
            id="Update">
            Update
          </p>

          <p
            className={filters.Participate ? 'filter-active' : 'filter-inactive'}
            onClick={filterByActionType}
            id="Participate">
            Participate
          </p>
        </div>
      </div>
      <ul className="logs-content__log--list list-header">
        <li>Date</li>
        <li>Action</li>
        <li>Trainer</li>
        <li>Client Name</li>
        <li>Client Email</li>
      </ul>
      {!logsToDisplay ? (
        <p>No logs to display</p>
      ) : (
        <LogFilters data={data} logsToDisplay={logsToDisplay} />
      )}
    </div>
  );
};

LogsList.propTypes = {
  data: PropTypes.object.isRequired
};
export default LogsList;
