import React from 'react';
import Header from '../components/header/header';
import User from '../components/home/user';
import QuickPlay from '../components/home/quickplay';

const Home = (props) => {
  return (
    <div id='home'>
      <Header />
      <main>
        <User {...props} />
        <QuickPlay {...props} />
      </main>
    </div>
  );
};

export default Home;
