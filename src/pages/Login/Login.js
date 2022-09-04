import React from 'react';
import './Login.css';
import { useState, useEffect } from 'react';
import { auth } from '../../components/api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../components/toasts/errorToasts';
import { ToastContainer } from 'react-toastify';

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //create a listener for enter key
  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/');
      localStorage.setItem('token', user._tokenResponse.idToken);
      sessionStorage.setItem('loggedIn', true);
    } catch (error) {
      console.error(error);
      errorToast('Invalid email or password');
    }
  };

  useEffect(() => {
    //unmount component
    console.log(loading);
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__container__logo">
            <img
              src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=height:60/https://file-uploads.teachablecdn.com/016c736e1243425591c1a63b349151e1/c1017a7ae49d498bba82a7f82b9d510b"
              alt="logo"
            />
          </div>
          <div className="login-page__container__form">
            <div className="login-page__container__form__title">
              <h1 data-testid="login-header">Login</h1>
            </div>
            <div className="login-page__container__form__inputs">
              <div className="login-page__container__form__inputs__input">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(event) => setLoginEmail(event.target.value)}
                  onKeyDown={handleEnterPress}
                  className="login-input"
                  data-testid="login-email"
                />
              </div>
              <div className="login-page__container__form__inputs__input">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setLoginPassword(event.target.value)}
                  onKeyDown={handleEnterPress}
                  className="login-input"
                  data-testid="login-password"
                />
              </div>
            </div>
            <div className="login-page__container__form__button">
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
