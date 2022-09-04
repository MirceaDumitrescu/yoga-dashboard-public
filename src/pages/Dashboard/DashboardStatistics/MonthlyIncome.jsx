import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { thisMonthString } from '../../../utils/constants';

const MonthlyIncome = () => {
  const finances = useSelector((state) => state.finances.value);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    const thisMonthIncome = finances.filter((fin) => fin.month?.includes(thisMonthString));
    setMonthlyIncome(thisMonthIncome.reduce((acc, curr) => acc + Number(curr.amount), 0));
  }, [finances]);

  return (
    <>
      <div className="statistics-item">
        <p>Income this month [{thisMonthString}]</p>
        <p className="statistic-pharagraph">{monthlyIncome} Ron</p>
        <p className="small-paragraph">Total income for current month</p>
      </div>
    </>
  );
};

export default MonthlyIncome;
