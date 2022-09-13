import React from 'react'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'

const Homepage = () => {
  const { isFetching } = useGetCryptosQuery(10)
  
  if (isFetching) return 'Loading...';

  return (
    <> 
      <div className="mt-20 mb-20 items-center justify-center mt-20" >
        <Cryptocurrencies simplified/>
      </div>
    </>
  )
}

export default Homepage