import moment from 'moment';
import { useSelector } from 'react-redux';

const ParticipantsLastMonth = () => {
  const users = useSelector((state) => state.users.value);
  const filteredUsers = users.filter((user) => user.last_entry);
  const lastMonthUsers = filteredUsers.filter((user) => {
    const lastEntry = moment(user.last_entry);
    const today = moment();
    const diff = today.diff(lastEntry, 'days');
    return diff <= 30;
  });

  return (
    <>
      <div className="statistics-item">
        <p>Participants last 30d</p>
        <p className="statistic-pharagraph">{lastMonthUsers.length}</p>
        <p className="small-paragraph">Based on class participation</p>
      </div>
    </>
  );
};

export default ParticipantsLastMonth;
