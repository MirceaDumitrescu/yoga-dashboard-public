import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserPage from './pages/userPage/UserPage';
import ClassList from './pages/classesPage/ClassPage';
import LogsPage from './pages/logs/ActivityLogs/Logs';
import App from './App';
import Login from './pages/Login/Login';
import CheckAuth from './pages/Login/checkAuth';
import FinancialLogs from './pages/logs/FinancialLogs/FinancialLogs';
import RenewalLogs from './pages/logs/RenewalLogs/RenewalLogs';
import UserProfile from './pages/UserProfile/UserProfile';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <CheckAuth>
              <App />
            </CheckAuth>
          }
        />
        <Route
          path="/users"
          element={
            <CheckAuth>
              <UserPage />
            </CheckAuth>
          }
        />
        <Route
          path="/classes"
          element={
            <CheckAuth>
              <ClassList />
            </CheckAuth>
          }
        />
        <Route
          path="/logs"
          element={
            <CheckAuth>
              <LogsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/financial-logs"
          element={
            <CheckAuth>
              <FinancialLogs />
            </CheckAuth>
          }
        />
        <Route
          path="/renewal-logs"
          element={
            <CheckAuth>
              <RenewalLogs />
            </CheckAuth>
          }
        />
        <Route path="/user/*">

          <Route path=":id" element={ <CheckAuth> <UserProfile /> </CheckAuth>} />

        </Route>


        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
