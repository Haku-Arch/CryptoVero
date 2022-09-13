import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Wallet() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  if(!user){
    navigate('/')
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <>
      <div className="flex justify-center mt-40">
        <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800 border-b">
            Wallet 
          </div>
          <div className="p-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
            <h5 className="text-gray-900 text-xl font-medium mb-2">User: {user.fullname}</h5>
            <p className="text-gray-900 text-base mb-4">
              Balance: {user.balance}
            </p>
            <p className="text-gray-900 text-base mb-4">
              Wallet ID: {user.wallet}
            </p>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <div className="flex items-center justify-center mb-3">
              <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                <Link to="/deposit"><button type="button" className="rounded-l inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus:ring-0 active:bg-purple-800 transition duration-150 ease-in-out">Deposit</button></Link>
                <Link to="/transfer"><button type="button" className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-purple-800 transition duration-150 ease-in-out">Transfer</button></Link>
                <Link to="/transactions"><button type="button" className="rounded-r inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus:ring-0 active:bg-purple-800 transition duration-150 ease-in-out">Transactions</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wallet