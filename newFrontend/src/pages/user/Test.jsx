import React from 'react'

const Test = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'API KEY',
  })

  return (
    <div className='mt-16'>
      this is test
    </div>
  )
}

export default Test
