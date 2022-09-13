import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deposit, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const Deposit = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const initialTransaction = {
    amount: 0,
    toWallet: user.wallet,
    type: "deposit"
  }

  const [transaction, setTransaction] = useState(initialTransaction);

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


  const onSubmit = (e) => {
    e.preventDefault()
    
    setTransaction(initialTransaction)
    dispatch(deposit(transaction))
  }

  return (
          <>
            <div className="flex justify-center mt-40">
              <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
              <div className="font-medium self-center text-xl sm:text-3xl text-gray-800 border-b">
                  Deposit 
                </div>
                <div className="p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>

                  <h5 className="text-gray-900 text-xl font-medium mb-2">Introduce an import:</h5>
                  <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <input
                          type="number"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Amount"
                          onChange={(e)=>setTransaction(
                            {...transaction, amount: e.target.value} )}
                        />
                    </div>
                    <div className="mb-6">
                      <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Deposit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
  )
}

export default Deposit