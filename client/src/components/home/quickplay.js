import React from 'react';
import dp from '../../img/svg/pieces/double_pawn.svg';
import wp from '../../img/svg/pieces/wp.svg';

const QuickPlay = () => {
  return (
    <div id='quick-play'>
      <div className='btn'>
        <div className='img-wrap'>
          <img src={dp} alt='two pawns' />
        </div>
        Play
      </div>
      <div className='btn'>
        <div className='img-wrap'>
          <img src={wp} alt='white pawn' />
        </div>
        Practice
      </div>
    </div>
  );
};

export default QuickPlay;
