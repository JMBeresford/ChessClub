import React from 'react';
import Chessground from 'react-chessground';

const Chessboard = () => {
  return (
    <div className='chessboard'>
      <div className='board-wrapper'>
        <Chessground width='100%' height='100%' coordinates={false} />
      </div>
    </div>
  );
};

export default Chessboard;
