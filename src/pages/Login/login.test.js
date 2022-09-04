import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './login';

describe('Login', () => {
  test('renders login button', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(
      screen.getByRole('button', {
        name: 'Login'
      })
    ).toBeInTheDocument();
  });

  // check if there is a login header
  test('renders login header', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const header = screen.getByTestId('login-header');
    expect(header).toBeInTheDocument();
  });

  // check if there is a login email input
  test('renders login email input', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
  });

  // check if there is a login password input
  test('renders login password input', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
  });
});
