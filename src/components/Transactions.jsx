import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Transactions() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    if(!user){
        navigate('/')
    }

    const getAmount = (transaction) => {
        let transactionSign = ""
        if(transaction.type ==="deposit" || transaction.toWallet === user.wallet){
            transactionSign = "+"
        }else{
            transactionSign = "-"
        }
        return `${transactionSign} ${transaction.amount}`
    }

    useEffect(() => {
        if (isError) {
        toast.error(message)
    }

    if (isSuccess) {
        toast.success(message)
    }

    dispatch(reset())
    }, [ user, isError, isSuccess, message, navigate, dispatch])

  return (
    <>
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800 mt-40">
            Transaction History
        </div>
        <div className="flex flex-col mt-10">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full border text-center mb-40">
                            <thead className="border-b">
                                <tr className="border-b bg-indigo-100 border-indigo-200">
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                        Type
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.transactions?.map((transaction,i)=>{
                                    return(
                                        <>
                                            <tr className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                                    <h4 className="font-bold text-red">{i+1}</h4>
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                    <h4 className="font-bold text-red">{transaction?.type}</h4>
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                    <h4 className="font-bold text-red">{getAmount(transaction)}</h4>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Transactions