import Dashboard from './pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import './pages/Dashboard/Dashboard.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {
  const haveData = useSelector((state) => state.dataStatus.value);

  // ///// TESTING /////
  // const url = 'http://localhost:3030/api/users/';
  // const method = 'GET';
  // const body = null;
  // fetchDatabase(url, method, body);
  // ///////////////////

  if (!haveData) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
