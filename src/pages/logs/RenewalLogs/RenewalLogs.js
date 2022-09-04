import React from 'react';
import '../ActivityLogs/Logs.css';
import './RenewalLogs.css';
import NavBar from '../../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect, useMemo } from 'react';
import Footer from '../../../components/Footer/Footer';
import { thisMonthString, currentYear } from '../../../utils/constants';
import uuid from 'react-uuid';

const RenewalLogs = () => {
  const renewalLogs = useSelector((state) => state.renewals.value);
  const haveData = useSelector((state) => state.dataStatus.value);
  const [data, setData] = useState({});
  const renewalsThisMonth = renewalLogs.filter(
    (renewal) => renewal.id === `${thisMonthString} - ${currentYear}`
  );
  const getLogs = () => {
    const result = {};

    if (renewalsThisMonth.length > 0) {
      for (const [key, value] of Object.entries(renewalsThisMonth[0])) {
        if (key !== 'id') {
          result[key] = value;
        }
      }
    }
    return result;
  };
  const obj = useMemo(() => getLogs(renewalLogs), [renewalLogs]);

  useEffect(() => {
    setData({
      renewalLogs: renewalLogs,
      haveData: haveData
    });
  }, [renewalLogs, haveData]);

  if (!data.haveData || !data.renewalLogs) {
    return (
      <div className="App">
        <Spinner animation="border" variant="primary" className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1 className="logs-page-title">Renewal Logs</h1>
      {renewalsThisMonth.length ? (
        <div className="logs-page">
          {Object.keys(obj).map((key) => (
            <div key={uuid()} className="logs-content__log">
              <div className="logs-row-title">{key}</div>
              <div className="logs-row-value header-titles">
                <p>FirstName</p>
                <p>LastName</p>
                <p>Email</p>
                <p>MoneySpent</p>
                <p>Old Date</p>
                <p>New Date</p>
                <p>Sessions</p>
                <p>Trainer</p>
              </div>
              {Object.values(obj[key]).map((value) => (
                <div className="logs-row-value" key={uuid()}>
                  <p>{value.firstname}</p>
                  <p>{value.lastname}</p>
                  <p>{value.email}</p>
                  <p>{value.moneySpent}</p>
                  <p>{value.oldExpirationDate}</p>
                  <p>{value.newExpirationDate}</p>
                  <p>{value.sessions}</p>
                  <p>{value.trainer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="logs-page">
          <p>No logs to display</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RenewalLogs;
