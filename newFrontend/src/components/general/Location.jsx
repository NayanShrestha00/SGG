import React, { useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

const Location = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDBd0de3uid-mWYrIHioT8jPCFvHW-dO9g',
    libraries,
  });

  const inputRef = useRef(null);
  const [address, setAddress] = useState('');

  const onPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places.length > 0) {
      setAddress(places[0].formatted_address);
    }
  };

  return (
    <div className='mt-72 text-center'>
      {isLoaded ? (
        <>
          <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={onPlacesChanged}>
            <input
              type='text'
              placeholder='Search address...'
              className='border p-2 rounded w-96'
            />
          </StandaloneSearchBox>
          <p className='mt-4'>Selected Address: {address}</p>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Location;
