import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function CheckAuth({ children }) {
  let sessionStorageValue = sessionStorage.getItem('loggedIn');
  return sessionStorageValue === 'true' ? children : <Navigate to="/login" replace />;
}

CheckAuth.propTypes = {
  children: PropTypes.node.isRequired
};

export default CheckAuth;
