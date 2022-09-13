import React,{ useState, useEffect } from 'react'
import millify from 'millify'

import { useGetCryptosQuery } from '../services/cryptoApi' 

const Cryptocurrencies = ({simplified}) => {
  const count = simplified? 10 : 100;
  const { data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filteredCryptos)
  },[cryptosList,search])

  if(isFetching) return "Loading..."
    return (
      <>
        {!simplified && (<div className='mt-40'>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={(e)=>setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        </div>)}
        <div className='grid grid-cols-4 gap-4 mt-10 mb-20'>
          {cryptos?.map((currency)=>{
            return(
              <div key={currency.uuid} className="p-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg ml-5 mr-5">                          
                <h3 className="text-lg text-white font-bold mb-2">{`${currency.rank}. ${currency.name}`}</h3>
                <p className="text-sm leading-6 text-white">{<img className='hi-outline hi-template inline-block w-12 h-12 text-indigo-500' src={currency.iconUrl}/>}</p>
                <p className="text-sm leading-6 text-white">Price: {millify(currency.price)}</p>
                <p className="text-sm leading-6 text-white">Market Cap: {millify(currency.marketCap)}</p>
                <p className="text-sm leading-6 text-white">Daily Change: {millify(currency.change)}%</p>
              </div>
            )
          })}
        </div>
      </>
    )
  }
  
  export default Cryptocurrencies