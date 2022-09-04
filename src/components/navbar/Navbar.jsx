import React from 'react';
import { Button } from 'react-bootstrap';
import SearchDrop from '../dropdownSearch';
import { auth } from '../api/firebase';
import { signOut } from 'firebase/auth';
import ExpenseModal from '../expenseModal/expenseModal';
import CreateUserModal from '../newMemberModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * Navbar contains the links to the different pages
 * and the search bar on top of the page
 *
 * @returns {JSX}
 *
 */
const NavBar = () => {
  const logout = async () => {
    await signOut(auth);
  };

  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const handleCloseAdd = () => setShowAddMember(false);
  const handleCloseExpense = () => setShowAddExpense(false);
  return (
    <nav>
      <div className="navbar">
        <div className="navbar-left">
          <img
            src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=height:60/https://file-uploads.teachablecdn.com/016c736e1243425591c1a63b349151e1/c1017a7ae49d498bba82a7f82b9d510b"
            alt="logo"
          />
        </div>
        <SearchDrop />
        <div className="nav-items">
          <li>
            <Button className="nav-button" variant="light">
              <Link to="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button className="nav-button" variant="primary" onClick={() => setShowAddMember(true)}>
              Add Member
            </Button>
          </li>
          <li>
            <Button className="nav-button" variant="light" onClick={() => setShowAddExpense(true)}>
              Add Expenses
            </Button>
          </li>
          <li>
            <Button className="nav-button" variant="light">
              <Link to="/users">All users</Link>
            </Button>
          </li>
          <li>
            <Button className="nav-button" variant="light">
              <Link to="/classes">Classes</Link>
            </Button>
          </li>
          <li>
            <Button className="nav-button" variant="light">
              <Link to="/logs">Logs</Link>
            </Button>
          </li>
          <li>
            <Button className="nav-button" variant="light" onClick={logout}>
              Logout
            </Button>
          </li>
        </div>
      </div>
      <CreateUserModal show={showAddMember} handleClose={handleCloseAdd} />
      <ExpenseModal show={showAddExpense} handleClose={handleCloseExpense} />
    </nav>
  );
};

export default NavBar;
