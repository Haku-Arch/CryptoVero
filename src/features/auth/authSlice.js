import {createSlice} from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker'

const user = JSON.parse(localStorage.getItem('user'))
const users = JSON.parse(localStorage.getItem('users'))

const initialState = {
    user: user ?? null,
    isError: false,
    isSuccess: false,
    message: '',
    users: users ?? [],
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      reset: (state) => {
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
        login: (state,action) => {
          const foundUser = state.users.find((user)=> user.email === action.payload.email)
          if(foundUser && foundUser?.password === action.payload.password){
            state.user = foundUser
            state.isSuccess = true
            state.message = "Login Successful"
            localStorage.setItem('user', JSON.stringify(foundUser))

          }else{
            state.isError = true
            state.message="Error in login"
          }
        },
        register: (state,action) => {
          const userData ={
            ...action.payload, wallet: faker.finance.bitcoinAddress(), balance: 0
          }
          state.user = userData
          state.users.push(userData)
          state.isSuccess = true
          state.message = "Register Successful"
          localStorage.setItem('user', JSON.stringify(userData)) 
          localStorage.setItem('users', JSON.stringify(state.users))

        },
        logout: (state) =>{
          state.user = null
          localStorage.removeItem("user")
        },
        transfer: (state, action) => {
          const {amount, toWallet} = action.payload
          let foundUser = state.users.find((user)=> user.wallet === toWallet)
          const amountResult = state.user.balance - amount
          if(!foundUser || toWallet === state.user.wallet){
            state.isError = true
            state.message="Invalid wallet"
          }else if(amountResult < 0){
            state.isError = true
            state.message="Insufficient balance"
          }else{
            state.isSuccess = true
            state.message = "Transfer Successful"
            const userTransactions = state.user.transactions ?? []
            const updatedTransactions = [...userTransactions, action.payload]
            const foundUserTransactions = foundUser.transactions ?? []
            const updatedFoundUserTransactions = [...foundUserTransactions, action.payload]
  
            const currentUser = {...state.user, balance: Number(state.user.balance) - Number(amount), transactions: updatedTransactions}
            
            foundUser = {...foundUser, balance: Number(foundUser.balance) + Number(amount), transactions: updatedFoundUserTransactions}
            const updatedUsers = state.users.map(user => {
              if (user.wallet === foundUser.wallet) {
                  return foundUser
              } else if (user.wallet === currentUser.wallet) {
                  return currentUser
              } else {
                  return user
              }
            })
            state.user = currentUser
            state.users = updatedUsers
            localStorage.setItem('user', JSON.stringify(currentUser))
            localStorage.setItem('users', JSON.stringify( updatedUsers ))

            
          }
        },
        deposit: (state, action) => {
          const {amount, toWallet} = action.payload
          const balance = state.user.balance

          const userTransactions = state.user.transactions ?? []
          const updatedTransactions = [...userTransactions, action.payload]

          const userData ={
            ...state.user, balance: Number(balance) + Number(amount), transactions: updatedTransactions
          }

          const updatedUsers = state.users.map(user => {
            if (user.toWallet === toWallet) {
                return userData
            } else {
                return user
            }
          })

          state.user= userData
          state.message="Deposit Successful"
          state.isSuccess = true
          state.users = updatedUsers

          localStorage.setItem('user', JSON.stringify(state.user))
          localStorage.setItem('users', JSON.stringify(updatedUsers))
          
        }
    },
})

export const { login, register, logout, reset, transfer, deposit } = authSlice.actions
export default authSlice.reducer