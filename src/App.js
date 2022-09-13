import React from 'react';
import { Routes , Route } from 'react-router-dom';
import { Navbar, Homepage, Cryptocurrencies, Transactions, Login, Register,Wallet,Transfer,Deposit, Footer } from './components'
import { ToastContainer } from 'react-toastify';

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className='main'>
            
              <div className='routes'>
                <Routes >
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/wallet" element={<Wallet/>}/>
                  <Route path="/transactions" element={<Transactions/>}/>
                  <Route path="/deposit" element={<Deposit/>}/>
                  <Route path="/transfer" element={<Transfer/>}/>
                </Routes >
              </div>
              <ToastContainer/>
              
        </div>
      <Footer/>
    </div>
  )
}

export default App