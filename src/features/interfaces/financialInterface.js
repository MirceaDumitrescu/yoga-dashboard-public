import PropTypes from 'prop-types';
import { today } from '../../utils/constants';

const financialInterface = (data, type) => {
  return {
    name: `${data.firstname} ${data.lastname}` || '',
    amount: data.moneySpent || '',
    date: data.date || '',
    month: data.thisMonthString || '',
    category: data.category || '',
    description: data.description || '',
    type: type || '',
    status: data.status || '',
    userId: data.uuid || '',
    createdAt: today,
    updatedAt: data.updatedAt || '',
    deletedAt: data.deletedAt || ''
  };
};

financialInterface.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default financialInterface;
