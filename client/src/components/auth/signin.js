import React, { useState } from 'react';
import Header from '../header/authheader';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { username, password };
    let API_URL = process.env.REACT_APP_API_URL;

    axios
      .post(API_URL + 'auth/signin', payload, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setPassword('');
          setUsername('');
          setErrors(true);
        }
      });
  };

  const handleUsernameChange = (event) => {
    setErrors(false);
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setErrors(false);
    setPassword(event.target.value);
  };

  return (
    <div id='signin'>
      {user && <Redirect to={{ pathname: '/' }} />}
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            className={`input${errors ? ' error' : ''}`}
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password
          <input
            className={`input${errors ? ' error' : ''}`}
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        <div className='buttons'>
          <input type='submit' id='login-btn' className='btn' value='Sign In' />
          <p>or</p>
          <Link to='/auth/register' id='register-btn' className='btn'>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
