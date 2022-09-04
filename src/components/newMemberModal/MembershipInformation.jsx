import { useContext } from 'react';
import { NewModalContext } from '../context/NewModalContext';
/**
 *
 *
 * Display the fields for the new member modal
 * where you can add the number of sessions and the cost
 * when the user is created. (Can be blank, not required)
 *
 *
 *
 */

const MembershipInputs = () => {
  const { userInformation, setPartialUserInformation, validation, setValidation } =
    useContext(NewModalContext);

  /**
   * Check if the value is a number, if not, setValid to false. This will throw an error
   */
  const checkValidation = () => {
    setValidation((prevState) => ({
      ...prevState,
      isValid: !isNaN(userInformation.sessions || userInformation.moneySpent)
    }));
  };

  const handleStartingDateChange = (event) => {
    setPartialUserInformation({ startingDate: event.target.value });
  };

  const handleMembershipChange = (event) => {
    /**
     * Check if the value is a number, if not, convert it to a number
     */

    setPartialUserInformation({ sessions: event.target.value });

    checkValidation();
  };

  const handleSetMoneyCost = (event) => {
    /**
     * Check if the value is a number, if not, convert it to a number
     */
    setPartialUserInformation({ moneySpent: event.target.value });
    checkValidation();
  };

  return (
    <div className="membership-type-add">
    <label htmlFor="cost">Start Date</label>
      <input
        type="date"
        id="date"
        placeholder="Date"
        className="w-100 membership-field"
        value={userInformation.startingDate}
        onChange={handleStartingDateChange}
      />
      <div className="membership-type-add-container">
        <label htmlFor="sessions">Sessions</label>
        <input
          type="text"
          id="text"
          placeholder="Sessions"
          className="w-100 membership-field"
          value={userInformation.sessions}
          onChange={handleMembershipChange}
          style={{
            outline: validation.isValid ? '' : '1px solid red'
          }}
        />
        <label htmlFor="cost">Cost</label>
        <input
          type="text"
          id="text"
          placeholder="Cost"
          className="w-100 membership-field"
          value={userInformation.moneySpent}
          onChange={handleSetMoneyCost}
          style={{
            outline: validation.isValid ? '' : '1px solid red'
          }}
        />
      </div>
    </div>
  );
};

export default MembershipInputs;
