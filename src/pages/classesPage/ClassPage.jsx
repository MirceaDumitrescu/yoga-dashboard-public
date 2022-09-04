import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ClassRender from './ClassRender';
import { ClassContext } from '../../components/context/ClassContext';
import { collection } from 'firebase/firestore';
import { db } from '../../components/api/firebase';
import { useSelector } from 'react-redux';
import { fetchClassesApi } from '../../components/api/api.service';
import './Classes.scss';

/**
 *
 * Renders the page for all classes
 *
 * @returns {JSX}
 */
const ClassList = () => {
  const dispatch = useDispatch();

  const haveData = useSelector((state) => state.dataStatus.value);
  const trainerData = useSelector((state) => state.trainerData.value);
  const classes = useSelector((state) => state.classes.value);
  const users = useSelector((state) => state.users.value);
  const logs = useSelector((state) => state.logs.value);
  const loggedInTrainer = useSelector((state) => state.loggedIn);
  const isDbConnected = useSelector((state) => state.dataStatus.value);

  const [state, setState] = useState({});
  const [trainerFilter, setTrainerFilter] = useState();
  const [filteredClasses, setFilteredClasses] = useState(classes);
  const [dateRange, setDateRange] = useState({});
  const [filteredByDate, setFilteredByDate] = useState(false);


  const saveClassFiltersLocalStorage = (filtered) => {
    localStorage.setItem('filteredClasses', JSON.stringify(filtered));
  };

  const saveFiltersForTrainersLocalStorage = (filtered) => {
    localStorage.setItem('filteredTrainers', JSON.stringify(filtered));
  }


  /**
   *
   * Function that creates the filter state based on user selection.
   * Populates the trainersObject with the filter values and sets the state of the filter.
   * @param {*} filterValueList (event)
   */
  const handleTrainerFilter = (filterValueList) => {
    if (filterValueList.length > 0) {
      filterValueList.forEach((trainer) => {
        setTrainerFilter((prevState) => ({
          ...prevState,
          [trainer.value]: true
        }));
        saveFiltersForTrainersLocalStorage(filterValueList);
      });
    } else {
      setTrainerFilter();
      localStorage.removeItem('filteredTrainers');
    }
  };

  useEffect(() => {
    /**
     * Loops through all classes and filters then based on the trainer filter
     * returns an array of classes that match the filter
     */

    if (isDbConnected) {
      const filters = classes.filter((classItem) => {
        if (trainerFilter && trainerFilter[classItem.trainer]) {
          return classItem;
        }
      });

      /**
       * if the trainer filter is empty, return all classes
       * else return the filtered classes
       */
      const getFilteredClassesFromLocalStorage = () => {
        const filteredClassesFromLocalStorage = localStorage.getItem('filteredClasses');
        if (filters.length > 0) {
          setFilteredClasses(filters);
          saveClassFiltersLocalStorage(filters);
        } else if (filteredClassesFromLocalStorage) {
          setFilteredClasses(JSON.parse(filteredClassesFromLocalStorage));
        } else {
          setFilteredClasses(classes);
        }
      };

      getFilteredClassesFromLocalStorage();
    }
  }, [trainerFilter, isDbConnected, classes]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, haveData: haveData }));
  }, [haveData]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, classes: classes }));
  }, [classes]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, users: users }));
  }, [users]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, logs: logs }));
  }, [logs]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loggedInTrainer: loggedInTrainer }));
  }, [loggedInTrainer]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, trainerData: trainerData }));
  }, [trainerData]);

  useEffect(() => {
    if (isDbConnected) {
      setState((prevState) => ({
        ...prevState,
        trainerDataRef: collection(db, 'trainers'),
        logsCollectionRef: collection(db, 'logs')
      }));
      return () => {
        setState((prevState) => ({
          ...prevState,
          trainerDataRef: null,
          logsCollectionRef: null
        }));
      };
    }
  }, [isDbConnected]);

  useEffect(() => {
    fetchClassesApi(dispatch);

    const getTrainerFilterFromLocalStorage = () => {
      const localStorageTrainerFilter = localStorage.getItem('filteredTrainers');
      if (localStorageTrainerFilter) {
        setTrainerFilter(JSON.parse(localStorageTrainerFilter));
      }
    }

    getTrainerFilterFromLocalStorage();
  }, []);

  const filterByDates = () => {
    const filtered = classes.filter((classItem) => {
      const classDate = new Date(classItem.date);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      return classDate >= startDate && classDate <= endDate;
    });
    setFilteredClasses(filtered);
    setFilteredByDate(true);
    saveClassFiltersLocalStorage(filtered);
  };

  const resetDateFilters = () => {
    setDateRange({});
    setFilteredClasses(classes);
    setFilteredByDate(false);
    saveClassFiltersLocalStorage(classes);
  };

  const handleStartDate = (e) => {
    setDateRange((prevState) => ({
      ...prevState,
      startDate: e.target.value
    }));
  };

  const handleEndDate = (e) => {
    setDateRange((prevState) => ({
      ...prevState,
      endDate: e.target.value
    }));
  };

  if (!state.haveData) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" className="spinner" />
      </div>
    );
  }

  return (
    <ClassContext.Provider
      value={{
        state,
        handleTrainerFilter,
        handleStartDate,
        handleEndDate,
        filteredClasses,
        resetDateFilters,
        filterByDates,
        filteredByDate,
      }}>
      <ClassRender />
    </ClassContext.Provider>
  );
};

export default ClassList;
