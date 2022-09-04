import { useSelector } from 'react-redux';
import { thisMonthString, currentYear } from '../../../utils/constants';
import { Link } from 'react-router-dom';

const TotalRenewals = () => {
  const renewals = useSelector((state) => state.renewals.value);

  const renewalsThisMonth = renewals.filter(
    (renewal) => renewal.id === `${thisMonthString} - ${currentYear}`
  );

  const getRenewals = (array) => {
    const renewals = [];
    array.forEach((renewal) => {
      for (const value of Object.entries(renewal)) {
        if (typeof value === 'object') {
          renewals.push(...value);
        }
      }
    });
    return renewals.length ? renewals.length : null;
  };

  const totalRenewals = getRenewals(renewalsThisMonth);

  return (
    <>
      <div className="statistics-item">
        <p>
          <Link to="/renewal-logs">Total renewals this month</Link>
        </p>
        {totalRenewals && <p className="statistic-pharagraph">{totalRenewals}</p>}
        {!totalRenewals && <p className="statistic-pharagraph">No renewals</p>}
        <p className="small-paragraph">Members that renewed their membership</p>
      </div>
    </>
  );
};

export default TotalRenewals;
