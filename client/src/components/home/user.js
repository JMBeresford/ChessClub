import React from 'react';

const User = (props) => {
  return (
    <div id='home-user'>
      <div className='img-wrap'>
        <img
          src='https://images.unsplash.com/photo-1529699310859-b163e33e4556?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1422&q=80'
          alt='chess profile'
        />
      </div>
      <div className='text'>
        <h1>{props.user.username}</h1>
        <h3>Rating: {props.user.rating || 1823}</h3>
      </div>
      <div className='bg'></div>
    </div>
  );
};

export default User;
