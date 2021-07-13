import React, { useState } from 'react';
import Header from '../header/authheader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from './input';
import {
  RiKeyFill,
  RiKeyLine,
  RiUserFill,
  RiAppleFill,
  RiFacebookCircleFill,
  RiMailFill,
} from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({
    user: false,
    email: false,
    pass: false,
    pass2: false,
    userexists: false,
    emailexists: false,
    match: false,
    notEmail: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { username, email, password, password2 };
    let API_URL = process.env.REACT_APP_API_URL;

    axios
      .post(API_URL + 'auth/register', payload, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        if (err.response) {
          let msg = err.response.data.msg;

          if (msg === 'Missing data from request') {
            if (!username) {
              setErrors((prev) => ({ ...prev, user: true }));
            }
            if (!email) {
              setErrors((prev) => ({ ...prev, email: true }));
            }
            if (!password) {
              setErrors((prev) => ({ ...prev, pass: true }));
            }
            if (!password2) {
              setErrors((prev) => ({ ...prev, pass2: true }));
            }
          }

          if (msg === "Passwords don't match") {
            setErrors((prev) => ({
              ...prev,
              pass: true,
              pass2: true,
              match: true,
            }));
          }

          if (err.response.status === 409) {
            if (err.response.data.username) {
              setErrors((prev) => ({
                ...prev,
                user: true,
                userexists: true,
              }));
            }

            if (err.response.data.email) {
              setErrors((prev) => ({
                ...prev,
                email: true,
                emailexists: true,
              }));
            }

            if (err.response.data.notEmail) {
              setErrors((prev) => ({
                ...prev,
                email: true,
                notEmail: true,
              }));
            }
          }
        }
      });
  };

  const handleChange = (event) => {
    let id = event.target.id;

    switch (id) {
      case 'usernameForm':
        setErrors((prev) => ({ ...prev, user: false, userexists: false }));
        if (event.type !== 'focus') {
          setUsername(event.target.value);
        }
        break;

      case 'emailForm':
        setErrors((prev) => ({
          ...prev,
          email: false,
          emailexists: false,
          notEmail: false,
        }));
        if (event.type !== 'focus') {
          setEmail(event.target.value);
        }
        break;

      case 'passwordForm':
        setErrors((prev) => ({ ...prev, pass: false, match: false }));
        if (event.type !== 'focus') {
          setPassword(event.target.value);
        } else if (!errors.match && !errors.pass) {
          setPassword('');
        }
        break;

      case 'password2Form':
        setErrors((prev) => ({ ...prev, pass2: false, match: false }));
        if (event.type !== 'focus') {
          setPassword2(event.target.value);
        } else if (!errors.match && !errors.pass2) {
          setPassword2('');
        }
        break;

      default:
        break;
    }
  };

  return (
    <div id='register'>
      <Header />
      <form onSubmit={handleSubmit}>
        <Input
          className={`input ${errors.user ? 'error' : ''} ${
            username.length > 0 ? 'active' : ''
          }`}
          type='text'
          id='usernameForm'
          label={errors.userexists ? 'Username in use' : 'Username'}
          value={username}
          icon={RiUserFill}
          onChange={handleChange}
          onFocus={handleChange}
        />
        <Input
          className={`input ${errors.email ? 'error' : ''} ${
            email.length > 0 ? 'active' : ''
          }`}
          type='text'
          id='emailForm'
          label={
            errors.emailexists
              ? 'Email in use'
              : errors.notEmail
              ? 'Enter a valid email'
              : 'Email'
          }
          value={email}
          icon={RiMailFill}
          onChange={handleChange}
          onFocus={handleChange}
        />
        <Input
          className={`input ${errors.pass ? 'error' : ''} ${
            password.length > 0 ? 'active' : ''
          }`}
          type='password'
          id='passwordForm'
          label={errors.match ? 'Passwords must match' : 'Password'}
          value={password}
          icon={RiKeyLine}
          onChange={handleChange}
          onFocus={handleChange}
        />
        <Input
          className={`input ${errors.pass2 ? 'error' : ''} ${
            password2.length > 0 ? 'active' : ''
          }`}
          type='password'
          id='password2Form'
          label={errors.match ? 'Passwords must match' : 'Confirm Password'}
          value={password2}
          icon={RiKeyFill}
          onChange={handleChange}
          onFocus={handleChange}
        />
        <input
          type='submit'
          id='register-btn'
          className='btn'
          value='Register'
        />
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

        <Link to='/auth/signin' id='signin-btn'>
          or sign in instead
        </Link>
      </div>
    </div>
  );
};

export default Register;
