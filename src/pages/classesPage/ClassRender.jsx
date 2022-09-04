import NavBar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useContext } from 'react';
import { ClassContext } from '../../components/context/ClassContext';
import Pagination from '../../components/pagination/pagination';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import archiveClass from '../../features/archiveClass';
import ClassParticipants from './ClassParticipants';

import './pagination.css';
import { useCallback } from 'react';
import { useEffect } from 'react';

const ClassRender = () => {
  const {
    handleTrainerFilter,
    handleStartDate,
    handleEndDate,
    filteredClasses,
    resetDateFilters,
    filteredByDate,
    filterByDates,
    trainerFilter
  } = useContext(ClassContext);

  // mock data
  const mockTrainers = [
    { value: 'mirceagab@gmail.com', label: 'Mircea Dumitrescu' },
    { value: 'stefan.nicolaescu@gmail.com', label: 'Stefan Nicolaescu' },
    { value: 'ahamtayoga@gmail.com', label: 'Roxana Dumitrescu' }
  ];

  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  const itemsPerPage = 10;
  let localStorageFilters = JSON.parse(localStorage.getItem('filteredTrainers'));

  const uniqueParticipants = useCallback((arr) => {
    const unique = arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    });
    return unique;
  }, []);

  useEffect(() => {
    return () => {
      resetDateFilters();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div className="class-list__container">
        <h1 className="class-list__title">Latest Classes</h1>
        <div className="class-list__filters">
          <div className="trainer-select__container">
            <p className="trainer-select__title">Trainer Filter</p>
            <Select
              className="trainer-select--select"
              components={makeAnimated()}
              isMulti
              value={trainerFilter ? trainerFilter : localStorageFilters}
              options={mockTrainers}
              onChange={handleTrainerFilter}
            />
          </div>
          <div className="class-select__container">
            <p className="class-select__title">Date interval selection</p>
            <div className="class-list__date--filter-buttons">
              <input className="filter-buttons__date" type="date" onChange={handleStartDate} />
              <input className="filter-buttons__date" type="date" onChange={handleEndDate} />
              <button className="filter-buttons__apply" onClick={filterByDates}>
                Apply Filter
              </button>
              <i
                className={
                  filteredByDate
                    ? 'fas fa-times filter-buttons--reset-date active'
                    : 'fas fa-times filter-buttons--reset-date'
                }
                onClick={resetDateFilters}></i>
            </div>
          </div>
        </div>
        <div className="class-list-container">
          {[...classes]?.map((date) => {
            return (
              <div key={date.id} className="class-container">
                <div className="class-title">
                  <div className="class-info">
                    <div className="class-date">{date.id}</div>
                    <div className="class-trainer">{date.trainer}</div>
                    <div className="class-hours">{date.hours}</div>
                  </div>
                  <div className="class-icons">
                    <div className="class-participants">
                      {uniqueParticipants(date.participants).length}
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="class-reservations">
                      <span>{date.reservations}</span>
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="class-cancelations">
                      <span>{date.cancelations}</span>
                      <i className="far fa-calendar-times"></i>
                    </div>
                    <div className="class-archive" onClick={() => archiveClass(date.id, dispatch)}>
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
                <ClassParticipants date={date} />
              </div>
            );
          })}

          <Pagination
            setCallback={setClasses}
            pageRangeDisplayed={5}
            itemsPerPage={itemsPerPage}
            filteredData={filteredClasses}
            location="classes"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClassRender;
