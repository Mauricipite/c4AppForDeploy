import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import computerReducer from '../features/computers/computerSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    computers: computerReducer,
  },
})
