import React from 'react';
import Header from '../components/header/header';
import User from '../components/home/user';

const Home = () => {
  return (
    <div id='home'>
      <Header />
      <main>
        <User />
      </main>
    </div>
  );
};

export default Home;
