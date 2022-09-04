import React from 'react';
import './Dashboard.css';
import { useState, useEffect } from 'react';
import ViewExpenses from '../../components/viewExpenses/viewExpenses';
import moment from 'moment';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MonthlyIncome from './DashboardStatistics/MonthlyIncome';
import ParticipantsLastDay from './DashboardStatistics/ParticipantsLastDay';
import ParticipantsLastMonth from './DashboardStatistics/ParticipantsLastMonth';
import NewMembersStats from './DashboardStatistics/NewMembersStats';
import TotalRenewals from './DashboardStatistics/TotalRenewals';
import ExpensesStats from './DashboardStatistics/ExpensesStats';
import TrainerStatistics from './DashboardStatistics/TrainerModuleStatistic/TrainerStatistics';
import { thisMonthString } from '../../utils/constants';
import { Link } from 'react-router-dom';

const stringToDate = (date) => {
  return moment(date).format('MMMM DD');
};

/**
 *
 * Main website dashboard.
 *
 * @returns JSX
 */
export const Dashboard = () => {
  const [showExpenses, setShowExpenses] = useState(false);
  const handleCloseAllExpenses = () => setShowExpenses(false);
  const users = useSelector((state) => state.users.value);

  const [sortedUsersByDate, setSortedUsersByDate] = useState([]);

  useEffect(() => {
    setSortedUsersByDate(
      users
        .filter((user) => user.last_entry)
        .sort((a, b) => {
          return new Date(b.last_entry) - new Date(a.last_entry);
        })
        .slice(0, 20)
    );
  }, [users]);

  return (
    <>
      <NavBar />
      <section className="statistics" data-testid="first-statistic-column">
        <ParticipantsLastDay />
        <ParticipantsLastMonth />
        <MonthlyIncome />
      </section>
      <section className="statistics" data-testid="second-statistic-column">
        <NewMembersStats thisMonthString={thisMonthString} />
        <TotalRenewals />
        <ExpensesStats setShowExpensesHandler={setShowExpenses} />
      </section>
      <div className="statistics-container__header">
        <p className="statistics-container">Trainer Statistics</p>
      </div>
      <section>
        <TrainerStatistics
          trainerEmail="stefan.nicolaescu@gmail.com"
          classCost={100}
          participantCost={30}
        />
      </section>
      <section className="dashboard">
        <div className="dashboard-header">
          <h3>Latest Activity</h3>
        </div>
        <div className="dashboard-body">
          {sortedUsersByDate.map((user) => {
            if (user.last_entry.length > 2) {
              return (
                <ul className="dashboard-list" key={user.id}>
                  <li className="dashboard-list-item">
                    <Link to={`/user/${user.id}`}>
                    <div className="dashboard-list-item-name" id={user.id}>
                      {user.firstname} {user.lastname}
                    </div>
                    </Link>
                    <div className="dashboard-list-item-date">{stringToDate(user.last_entry)}</div>
                    <div className="dashboard-list-item-sessions">{user.current_sessions}</div>
                  </li>
                  <div className="separator"></div>
                </ul>
              );
            } else {
              return (
                <div>
                  <h3>No activity yet</h3>
                </div>
              );
            }
          })}
        </div>
      </section>
      <Footer />

      <ViewExpenses show={showExpenses} handleClose={handleCloseAllExpenses} />
    </>
  );
};

export default Dashboard;
