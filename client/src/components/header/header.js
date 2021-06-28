import React, { useState } from 'react';
import horses from '../../img/svg/horses.svg';
import { Link, Redirect } from 'react-router-dom';
import { CgMenuRightAlt, CgClose } from 'react-icons/cg';
import axios from 'axios';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(true);

  const menuToggle = () => {
    setOpen((prev) => !prev);
  };

  const signout = () => {
    let API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(API_URL + 'auth/signout', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUser(false);
        }
      });
  };

  return (
    <header id='header'>
      {!user && <Redirect to='/auth/signin' />}
      <div className='brand'>
        <img className='header-logo' src={horses} alt='horses logo' />
        <h1>Chess Club</h1>
      </div>
      <CgMenuRightAlt className='menu-btn' onClick={() => menuToggle()} />
      <nav className={`nav${open ? ' open' : ''}`}>
        <CgClose className='close-menu-btn' onClick={() => menuToggle()} />
        <Link className='nav-item' to='/profile'>
          Profile
        </Link>
        <Link className='nav-item' to='/games'>
          Games
        </Link>
        <button className='nav-item' onClick={() => signout()}>
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
