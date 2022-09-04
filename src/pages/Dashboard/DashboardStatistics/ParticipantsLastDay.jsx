import { useSelector } from 'react-redux';
import moment from 'moment';

const ParticipantsLastDay = () => {
  const users = useSelector((state) => state.users.value);
  const filteredUsers = users.filter((user) => user.last_entry);
  const lastDayUsers = filteredUsers.filter((user) => {
    const lastEntry = moment(user.last_entry);
    const today = moment();
    const diff = today.diff(lastEntry, 'hours');
    return diff <= 24;
  });
  return (
    <>
      <div className="statistics-item">
        <p>Participants last 24h</p>
        <p className="statistic-pharagraph">{lastDayUsers.length}</p>
        <p className="small-paragraph">Based on class participation</p>
      </div>
    </>
  );
};

export default ParticipantsLastDay;
