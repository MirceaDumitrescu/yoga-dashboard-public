import React from 'react';
import './Logs.css';
import NavBar from '../../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from 'react';
import Footer from '../../../components/Footer/Footer';
import LogsList from './LogsList';

const LogsPage = () => {
  const logs = useSelector((state) => state.logs.value);
  const users = useSelector((state) => state.users.value);
  const haveData = useSelector((state) => state.dataStatus.value);
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      users: users,
      logs: logs,
      haveData: haveData
    });
  }, [logs, haveData, users]);

  if (!data.haveData || !data.logs) {
    return (
      <div className="App">
        <Spinner animation="border" variant="primary" className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1 className="logs-page-title">Activity Logs</h1>
      <div className="logs-page">
        <LogsList data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default LogsPage;
