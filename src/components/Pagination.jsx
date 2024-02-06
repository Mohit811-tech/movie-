import React, { useState } from 'react';

function Pagination(props) {
  const { onPrev, page, onNext} = props;

  return (
    <div className='flex'>
      <div className='flex mx-auto mb-4'>

        <button className='p-2 border border-black border-3 border-solid border-r-0 rounded-l-full' onClick={onPrev}>Previous</button>

        <div className='p-2 border border-black border-3 border-solid'>{page}</div>
        
        <button className='p-2 border border-black border-3 border-solid border-l-0 rounded-r-full' onClick={onNext}>Next</button>
     
      </div>
    </div>
  );
}

export default Pagination;
