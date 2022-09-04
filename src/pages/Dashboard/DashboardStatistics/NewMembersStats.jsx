import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';

const NewMembersStats = ({ thisMonthString }) => {
  const users = useSelector((state) => state.users.value);

  const newMembers = users.filter((user) => {
    const userMonth = moment(user.starting_date).format('MMMM');
    return userMonth === thisMonthString;
  });

  return (
    <>
      <div className="statistics-item">
        <p>New Members this month</p>
        <p className="statistic-pharagraph">{newMembers.length}</p>
        <p className="small-paragraph"> new members</p>
      </div>
    </>
  );
};

NewMembersStats.propTypes = {
  thisMonthString: PropTypes.string.isRequired
};

export default NewMembersStats;
