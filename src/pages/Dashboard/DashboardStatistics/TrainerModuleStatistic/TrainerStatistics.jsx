import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useState, useEffect } from 'react';
// import { thisMonthString } from '../../../../utils/constants';

/**
 *
 * JSX Component that gets rendered on Dashboard and displays the statistics for the trainer
 * added in the settings panel. If you wish to keep track on any of the trainers working
 * at your studio. Check dashboard settings for more configurable options in the future.
 *
 *
 * @param {*} trainerEmail - the email of the trainer you wish to display the data for
 * @param {*} participantCost - the cost applied for each participant the trainer has. This represents the amount you have to pay him
 * @param {*} classCost - the cost applied for each class the trainer has. This represents the amount he has to pay you
 * @returns JSX
 */
const TrainerStatistics = ({ trainerEmail, participantCost, classCost }) => {
  const trainers = useSelector((state) => state.trainerData.value);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);

  useEffect(() => {

    const trainerData = trainers.filter((trainer) => new Date(trainer.date).getMonth() === new Date().getMonth());

    const filterByTrainerEmail = trainerData.filter((trainer) => trainer.email === trainerEmail);
    const getTrainerParticipants = filterByTrainerEmail.map((trainer) => trainer.participants);
    const trainerLogsWithParticipants = filterByTrainerEmail.filter(
      (trainer) => trainer.participants > 0
    );
    const getTrainerCollections = filterByTrainerEmail.map((trainer) => trainer.collections);

    const classesThisMonth = trainerLogsWithParticipants.filter((trainer) =>
      moment(trainer.dateOfParticipant).isSame(moment(), 'month')
    );

    const classesThisMonthParticipants = classesThisMonth.map(
      (trainer) => trainer.dateOfParticipant
    );

    const uniqueClassesThisMonth = [...new Set(classesThisMonthParticipants)];

    setTotalClasses(uniqueClassesThisMonth);
    setTotalParticipants(
      Object.values(getTrainerParticipants).reduce((acc, curr) => acc + curr, 0)
    );
    setTotalCollections(
      Object.values(getTrainerCollections).reduce((acc, curr) => acc + Number(curr), 0)
    );
  }, [trainers, trainerEmail]);

  return (
    <>
      <div className="statistics">
        <div className="statistics-item">
          <p>
            {trainerEmail}&apos;s participants: {totalParticipants}
          </p>
          <p className="statistic-pharagraph">{totalParticipants * participantCost} Ron</p>
          <p className="small-paragraph">Payment he needs to receive</p>
        </div>
        <div className="statistics-item">
          <p>{trainerEmail} collected this month:</p>
          <p className="statistic-pharagraph">{totalCollections} Ron</p>
          <p className="small-paragraph">Collections from customers</p>
        </div>
        <div className="statistics-item">
          <p>{trainerEmail}&apos;s classes this Month</p>
          <p className="statistic-pharagraph">{totalClasses.length * classCost} Ron</p>
          <p className="small-paragraph">Based on total number of classes</p>
        </div>
      </div>
    </>
  );
};

TrainerStatistics.propTypes = {
  statsObject: PropTypes.object,
  trainerEmail: PropTypes.string,
  participantCost: PropTypes.number,
  classCost: PropTypes.number
};

export default TrainerStatistics;
