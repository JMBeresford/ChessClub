import React, { useState } from 'react';
import Header from '../header/authheader';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Input from './input';
import {
  RiKeyFill,
  RiUserFill,
  RiAppleFill,
  RiFacebookCircleFill,
} from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

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
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 400) {
            setPassword('');
            setUsername('');
            setErrors(true);
          }
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
        {errors && <p className='errorText'>Incorrect Credentials</p>}
        <Input
          className={`input ${errors ? 'error' : ''} ${
            username.length > 0 ? 'active' : ''
          }`}
          type='text'
          id='usernameForm'
          label='Username'
          value={username}
          icon={RiUserFill}
          onChange={handleUsernameChange}
        />
        <Input
          className={`input ${errors ? 'error' : ''} ${
            password.length > 0 ? 'active' : ''
          }`}
          type='password'
          id='passwordForm'
          label='Password'
          value={password}
          icon={RiKeyFill}
          onChange={handlePasswordChange}
        />

        <input type='submit' id='signin-btn' className='btn' value='Sign In' />
      </form>

      <div className='alternatives'>
        <div className='socials'>
          <div className='social google'>
            <FcGoogle size='60%' />
          </div>
          <div className='social apple'>
            <RiAppleFill size='60%' color='white' />
          </div>
          <div className='social facebook'>
            <RiFacebookCircleFill size='60%' color='white' />
          </div>
        </div>

        <Link to='/auth/register' id='register-btn'>
          or register instead
        </Link>
      </div>
    </div>
  );
};

export default Signin;
