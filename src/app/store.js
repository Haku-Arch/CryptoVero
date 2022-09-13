import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { cryptoApi } from '../services/cryptoApi'

export default configureStore({
    reducer: {
        auth: authReducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
})