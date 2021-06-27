import React, { useState } from 'react';
import Header from '../header/authheader';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { username, email, password, password2 };
    let API_URL = process.env.REACT_APP_API_URL;

    axios
      .post(API_URL + 'auth/register', payload, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setPassword('');
          setUsername('');
          setEmail('');
          setPassword2('');
          setErrors(true);
        }
      });
  };

  const handleChange = (event) => {
    let id = event.target.id;
    setErrors(false);

    switch (id) {
      case 'username':
        setUsername(event.target.value);
        break;

      case 'email':
        setEmail(event.target.value);
        break;

      case 'password':
        setPassword(event.target.value);
        break;

      case 'password2':
        setPassword2(event.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div id='register'>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            id='username'
            className={`input${errors ? ' error' : ''}`}
            type='text'
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            id='email'
            className={`input${errors ? ' error' : ''}`}
            type='text'
            value={email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            id='password'
            className={`input${errors ? ' error' : ''}`}
            type='password'
            value={password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm Password
          <input
            id='password2'
            className={`input${errors ? ' error' : ''}`}
            type='password'
            value={password2}
            onChange={handleChange}
          />
        </label>

        <div className='buttons'>
          <input
            type='submit'
            id='register-btn'
            className='btn'
            value='Register'
          />
          <p>or</p>
          <Link to='/auth/signin' id='signin-btn' className='btn'>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
