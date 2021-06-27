import React from 'react';
import horses from '../../img/svg/horses.svg';

const Header = () => {
  return (
    <header id='authheader'>
      <img className='header-logo' src={horses} alt='horses logo' />
      <h1>Chess Club</h1>
    </header>
  );
};

export default Header;
