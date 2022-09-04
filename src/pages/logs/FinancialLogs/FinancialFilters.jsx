// import makeAnimated from 'react-select/animated';
import { useState, useEffect } from 'react';
// import Select from 'react-select';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

import '../../classesPage/Classes.scss';

const FinancialFilter = ({ logs, setPartialLogs }) => {
  const [dateRange, setDateRange] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);

  const filterByDates = (dateRange) => {
    if (dateRange.startDate && dateRange.endDate) {
      const filtered = logs.filter((logItem) => {
        const logDate = new Date(logItem.date);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return logDate >= startDate && logDate <= endDate;
      });
      setPartialLogs(filtered);
      calculateTotalIncome(filtered);
    } else {
      setPartialLogs();
      calculateTotalIncome(logs);
    }
  };

  const resetDateFilters = () => {
    setDateRange((prevState) => ({
      ...prevState,
      startDate: '',
      endDate: ''
    }));
    setPartialLogs();
  };

  const handleStartDate = (startDateEvent) => {
    setDateRange((prevState) => ({
      ...prevState,
      startDate: startDateEvent.target.value
    }));
  };

  const handleEndDate = (endDateEvent) => {
    setDateRange((prevState) => ({
      ...prevState,
      endDate: endDateEvent.target.value
    }));
  };


  const calculateTotalIncome = (logs) => {
    let total = 0;
    logs.forEach((log) => {
      total += Number(log.moneySpent);
    });
    setTotalIncome(total);
  };

  useEffect(() => {
    filterByDates(dateRange);
  }, [dateRange]);

  return (
    <>
      <div className="class-list__filters">
        <div className="trainer-select__container">
          <p className="trainer-select__title">Trainer Filter</p>

          {/* <Select
            className="trainer-select--select"
            components={makeAnimated()}
            isMulti
            options={trainersObject}
            onChange={handleTrainerFilter}
          /> */}
          <p className="trainer-select__income">
            Total income:<span>{totalIncome}</span>
          </p>
        </div>
        <div className="class-select__container">
          <p className="class-select__title">Date interval selection</p>
          <div className="class-list__date--filter-buttons">
            <input className="filter-buttons__date" type="date" onChange={handleStartDate} />
            <input className="filter-buttons__date" type="date" onChange={handleEndDate} />
            <i className="fas fa-times filter-buttons--reset-date" onClick={resetDateFilters}></i>
          </div>
        </div>
      </div>
    </>
  );
};

FinancialFilter.propTypes = {
  logs: PropTypes.array,
  setPartialLogs: PropTypes.func.isRequired
};

export default FinancialFilter;
