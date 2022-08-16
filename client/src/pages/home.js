import React from 'react';
import Header from '../components/header/header';
import User from '../components/home/user';
import QuickPlay from '../components/home/quickplay';
import EloChart from '../components/home/elochart';

const Home = (props) => {
  return (
    <div id='home'>
      <Header />
      <main>
        <User {...props} />
        <QuickPlay {...props} />
        <EloChart {...props} />
      </main>
    </div>
  );
};

export default Home;
