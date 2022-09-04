import React, { useEffect, useRef, useState } from 'react';
import './dropdownSearch.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 *
 *
 * Handles the rendering of the search dropdown
 * when the user start searching for a member
 *
 * @returns {JSX}
 */
const SearchDrop = () => {
  const ref = useRef();
  const users = useSelector((state) => state.users.value);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  /**
   *
   * Function to filter users by search term
   * returns an array of users that match the search term
   *
   * @param {*} data
   * @returns {Array}
   */
  const filterUsers = (data) => {
    return data.filter((el) => {
      return (
        el.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        el.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  filterUsers.propTypes = {
    data: PropTypes.array.isRequired
  };

  /**
   *
   * Function to set the search term
   * and set the showSearch state to true
   * which makes the search dropdown visible
   *
   * @param {*} e
   */
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSearch(e.target.value.length > 1);
  };

  /**
   *
   * Function to close the search dropdown
   * if you click outside of it
   *
   * @param {*} ref
   * @param {*} callback
   */
  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  };

  useOutsideClick.propTypes = {
    ref: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
  };

  useOutsideClick(ref, () => {
    setShowSearch(false);
    setSearchTerm('');
  });

  return (
    <>
      <div className="search-input">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          className="search-input-field"></input>

        {showSearch && (
          <div className="search-dropdown" ref={ref}>
            {filterUsers(users).length > 0 ? (
              filterUsers(users).map((user) => {
                return (
                  <div className="search-dropdown-item" key={user.id}>
                    <Link to={`/user/${user.id}`}>
                    <p id={user.id} className="search-result">
                      {user?.firstname} {user?.lastname}
                    </p>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="search-dropdown-item">
                <p className="search-result">No results</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchDrop;
