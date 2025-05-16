import React, { useRef, useState } from 'react';
import { refreshAccessToken } from '../../features/api/AuthServices';
import { useSelector , useDispatch} from 'react-redux';


const New = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  console.log('old access token', accessToken);
  

  const handleRefresh = async () => {
    const response = await dispatch(refreshAccessToken());
    console.log('new access token', accessToken);
    
    
  }

  return (
    <div className='pt-48'>
      <button className='p-5 bg-blue-500 text-white'
        onClick={handleRefresh}
      >
        Refresh
      </button>
    </div>
  );
};

export default New;
