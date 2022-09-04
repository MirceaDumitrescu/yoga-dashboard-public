import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

const initialState = {
  users: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  finances: {
    value: [
      {
        active: true,
        id: '01uUZET49mqKB3CFh1YA',
        creation_date: '2022-04-26',
        email: 'neacsa.iulia@yahoo.ro',
        entries: [],
        firstname: 'Iulia',
        lastname: 'Neacsa',
        money_spent: 40,
        observation: '',
        phone: '076-876-876',
        renewals: [],
        starting_date: '2020-05-01',
        uuid: 'd22c13-5112-f6fd-156-04fa2411'
      }
    ]
  },
  members: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  classes: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  logs: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  renewals: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  trainerParticipants: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  trainerCollection: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  trainerData: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  },
  expenses: {
    value: [
      {
        id: 1,
        name: 'John Doe',
        email: ''
      }
    ]
  }
};

describe('Dashboard', () => {
  test('renders dashboard page succesfully', () => {
    const store = configureStore();

    render(
      <Router>
        <Provider store={store(initialState)}>
          <Dashboard />
        </Provider>
      </Router>
    );

    //check for logo
    const firstStatisticsColumn = screen.getByTestId('first-statistic-column');
    expect(firstStatisticsColumn).toBeInTheDocument();
  });
});
